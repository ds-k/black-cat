import axios from "axios";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { GeoType } from "../types";
import "../styles/MapStyle.css";

interface IProps {
  data: GeoType | null;
  setData: Dispatch<SetStateAction<GeoType | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const Map = ({ data, setData, setIsLoading }: IProps) => {
  const [curPin, setCurPin] = useState<Element | null>(null);

  useEffect(() => {
    let mapDiv = document.getElementById("map");
    let center = new naver.maps.LatLng(37.50619726782106, 127.06353904199999);
    let map = new naver.maps.Map(mapDiv as HTMLElement, {
      center,
      zoom: 17,
    });

    let marker: naver.maps.Marker | null = null;

    naver.maps.Event.addListener(map, "click", (e) => {
      setIsLoading(true);
      if (!marker) {
        let markerOptions = {
          position: e.latlng,
          map,
          title: "pin",
          icon: {
            url: "/pin.svg",
            anchor: new naver.maps.Point(110, 200),
          },
        };
        marker = new naver.maps.Marker(markerOptions);
        map.panTo(e.latlng, { duration: 700 });
      } else {
        marker.setPosition(e.latlng);
        map.panTo(e.latlng, { duration: 700 });
      }

      let pin = document.querySelector("div[title='pin']");
      if (pin) {
        pin.className = "spin";
      }

      let beforeContainer = document.querySelector("#container");
      if (beforeContainer) {
        pin?.removeChild(beforeContainer);
      }

      let container = document.createElement("div");
      container.id = "container";

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
            return alert("Something wrong!");
          }

          var result = response.v2;
          const jibun = result.results[0];
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

          function sleep(ms: number) {
            const wakeUpTime = Date.now() + ms;
            while (Date.now() < wakeUpTime) {}
          }
          axios
            .get(
              `https://vos.land/api/asset/all-processed-data?asset_pnu=${pnu}`
            )
            .then((res) => {
              setTimeout(() => {
                setData(res.data);
                setIsLoading(false);
                pin?.classList.remove("spin");
                let address = document.createElement("div");
                address.className = "address";
                address.textContent = res.data.assetOverviewMulti.assetAddress;
                let price = document.createElement("div");
                price.className = "price";
                price.textContent =
                  res.data.assetOverviewMulti.assetValue.estimatePrice;
                container.append(address);
                container.append(price);
                pin?.append(container);
              }, 500);
            })
            .catch((e) => console.log(e));
        }
      );
    });
  }, []);

  return (
    <div className="w-full">
      <div className="outline-none" id="map" style={{ height: "100vh" }}></div>
    </div>
  );
};

export default Map;
