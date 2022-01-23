import axios from "axios";
import { useEffect, Dispatch, SetStateAction, useRef } from "react";
import { GeoType } from "../types";
import "../styles/MapStyle.css";
import { priceToKorean } from "../utils";
import { useLocation, useNavigate } from "react-router-dom";

interface IProps {
  data: GeoType | null;
  setData: Dispatch<SetStateAction<GeoType | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setIsHome: Dispatch<SetStateAction<boolean>>;
}

const Map = ({ data, setData, setIsLoading, setIsHome }: IProps) => {
  let navigate = useNavigate();
  const { pathname } = useLocation();
  const path = pathname.split("/")[2];
  const mapDivRef = useRef(null);
  const mapRef = useRef<naver.maps.Map>();
  const markerRef = useRef<naver.maps.Marker>();

  useEffect(() => {
    if (path) {
      setIsHome(false);
      setIsLoading(true);
      axios
        .get(`https://vos.land/api/asset/all-processed-data?asset_pnu=${path}`)
        .then((res) => {
          setData(res.data);
          let map = mapRef.current;
          let position = res.data.centerPoint.streetViewTarget;
          let marker = markerRef.current;
          if (!marker) {
            let markerOptions = {
              position,
              map,
              title: "pin",
              icon: {
                url: "/pin.svg",
                anchor: new naver.maps.Point(110, 200),
              },
            };
            marker = new naver.maps.Marker(markerOptions);
            markerRef.current = marker;
            map?.panTo(position, { duration: 700 });
          } else {
            marker.setPosition(position);
            map?.panTo(position, { duration: 700 });
          }
          let pin = document.querySelector("div[title='pin']");
          if (pin) {
            pin.className = "spin";
          }
          let beforeContainer = document.querySelector("#container");
          if (beforeContainer) {
            pin?.removeChild(beforeContainer);
          }
          return res;
        })
        .then((res) => {
          setTimeout(() => {
            setIsLoading(false);
            let pin = document.querySelector("div[title='pin']");
            pin?.classList.remove("spin");
            let container = document.createElement("div");
            container.id = "container";

            let address = document.createElement("div");
            address.className = "address";
            address.textContent = ` ${res.data.assetOverviewMulti.assetAddressObject.emd} ${res.data.assetOverviewMulti.assetAddressObject.ji}`;
            let price = document.createElement("div");
            price.className = "price";
            price.textContent = priceToKorean(
              res.data.assetOverviewMulti.assetValue.estimatePrice
            );

            container.append(address);
            if (res.data.assetOverviewMulti.assetValue.estimatePrice !== null) {
              container.append(price);
            }
            pin?.append(container);
          }, 500);
        })
        .catch((e) => {
          alert("서비스 준비중인 지역입니다.");
        });
    }
  }, [path]);

  useEffect(() => {
    let mapDiv = mapDivRef.current;
    let center = new naver.maps.LatLng(37.50619726782106, 127.06353904199999);
    let map = new naver.maps.Map(mapDiv as unknown as HTMLElement, {
      center,
      zoom: 17,
    });
    mapRef.current = map;

    naver.maps.Event.addListener(map, "click", (e) => {
      naver.maps.Service.reverseGeocode(
        {
          coords: e.latlng,
          orders: [
            naver.maps.Service.OrderType.ADDR,
            naver.maps.Service.OrderType.ROAD_ADDR,
          ].join(","),
        },
        (status, response) => {
          if (status !== naver.maps.Service.Status.OK) {
            alert("네이버 서버 오류입니다.");
          }

          var result = response.v2;
          const jibun = result.results[0];
          if (!jibun) alert("이용할 수 없는 지역입니다.");
          const { code, land } = jibun;

          const make4 = (s: string): string => {
            let arr = s.split("");
            while (arr.length !== 4) {
              arr = ["0", ...arr];
            }
            return arr.join("");
          };

          let pnu =
            code.id + land.type + make4(land.number1) + make4(land.number2);

          navigate(`/property/${pnu}`);
        }
      );
    });
  }, []);

  return (
    <div className="w-full">
      <div
        className="outline-none"
        id="map"
        ref={mapDivRef}
        style={{ height: "100vh" }}
      ></div>
    </div>
  );
};

export default Map;
