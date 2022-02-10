import axios from "axios";
import { useEffect, Dispatch, SetStateAction, useRef } from "react";
import { GeoType } from "../types";
import "../styles/MapStyle.css";
import { priceToKorean } from "../utils";
import { useLocation, useNavigate } from "react-router-dom";

interface ResultItem extends naver.maps.Service.ResultItem {
  land: Land;
} // * land가 type에 없어서 확장시켰습니다.

interface Land {
  type: string;
  number1: string;
  number2: string;
}

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
  // * 라우터 이동시 path를 받아 전달 (path는 생성된 pnu)
  const mapDivRef = useRef(null);
  const mapRef = useRef<naver.maps.Map>();
  const markerRef = useRef<naver.maps.Marker>();

  // * Map 생성 밑 클릭시 마커 생성
  useEffect(() => {
    const mapDiv = mapDivRef.current; // * Map이 들어갈 div
    const center = new naver.maps.LatLng(37.50619726782106, 127.06353904199999); // * center 설정
    let map = new naver.maps.Map(mapDiv as unknown as HTMLElement, {
      center,
      zoom: 17,
    });
    mapRef.current = map; // * map 생성 후 mapRef에 등록 (리랜더링 방지)
    naver.maps.Event.addListener(map, "click", getCodeAndNavigate); // * 클릭 이벤트 등록 (좌표에 대한 코드 받고, 라우트 이동)

    function getCodeAndNavigate(e: any) {
      const coords = {
        coords: e.latlng,
        orders: [
          naver.maps.Service.OrderType.ADDR,
          naver.maps.Service.OrderType.ROAD_ADDR,
        ].join(","),
      }; // * 도로명, 지번 주소 모두 얻는 옵션

      naver.maps.Service.reverseGeocode(coords, onSuccess); // * geoCode 서브모듈을 통해 좌표로 지역코드를 얻는 함수

      // * 성공시 처리하는 함수
      function onSuccess(
        status: naver.maps.Service.Status,
        response: naver.maps.Service.ReverseGeocodeResponse
      ) {
        if (status !== naver.maps.Service.Status.OK) {
          alert("네이버 서버 오류입니다.");
          return;
        }

        const { v2: result } = response;
        const [jibun] = result.results;

        if (!jibun) alert("이용할 수 없는 지역입니다.");
        const { code, land } = jibun as ResultItem;

        const formatPnu = (s: string): string => {
          let arr = s.split("");
          while (arr.length !== 4) {
            arr = ["0", ...arr];
          }
          return arr.join("");
        };
        // * 찾아낸 규칙 : 법정동 코드 + land.type + 번지 앞자리(4개의 숫자) + 번지 뒷자리(4개의 숫자)
        const pnu =
          code.id +
          land.type +
          formatPnu(land.number1) +
          formatPnu(land.number2);

        navigate(`/property/${pnu}`); // * pnu를 붙여서 router 이동
      }
    }
  }, []);

  useEffect(() => {
    if (path) {
      setIsHome(false); // * path가 있다는 건 이제 클릭이 되었다는 뜻이기 때문에 isHome 상태 false
      setIsLoading(true); // * 요청이 완료되기 전까지 isLoading은 true
      axios // * 요청 시작
        .get(`https://vos.land/api/asset/all-processed-data?asset_pnu=${path}`)
        .then((res) => {
          setData(res.data); // * drawer에서 활용하기 위해 setData
          const map = mapRef.current; // * useRef 활용해서 map 리랜더링 방지
          const position = res.data.centerPoint.streetViewTarget; // * api에서 받은 centerPoint로 중앙 설정
          const marker = markerRef.current; // * useRef 활용해서 marker 할당
          if (!map) return;
          if (!marker) {
            // * 최초 마커가 없을 경우
            const markerOptions = {
              position,
              map,
              title: "pin",
              icon: {
                url: "/pin.svg",
                anchor: new naver.maps.Point(110, 200), // * 클릭 지점의 중앙 상단에 위치하도록 조정
              },
            };
            markerRef.current = new naver.maps.Marker(markerOptions);
            map.panTo(position, { duration: 700 });
          } else {
            marker.setPosition(position); // * marker가 있을 경우는 포지션 설정
            map.panTo(position, { duration: 700 }); // * position으로 맵 이동
          }
          // * 데이터가 올때까지 스핀
          const pin = document.querySelector("div[title='pin']");
          if (pin) {
            pin.className = "spin";
          }
          // * 이전 마커에 기록된 주소 및 가격 데이터 삭제
          const previousData = document.querySelector("#data");
          if (previousData && pin) {
            pin.removeChild(previousData);
          }
          return res;
        })
        .then((res) => {
          if (!res) return;
          setTimeout(() => {
            setIsLoading(false);
            const { assetAddressObject, assetValue } =
              res.data.assetOverviewMulti;

            const pin = document.querySelector("div[title='pin']");
            pin?.classList.remove("spin"); // * 500ms 이후 spin class 삭제 -> 회전 멈춤

            // * data(주소, 가격정보)를 마커(pin)에 기록
            const data = document.createElement("div");
            data.id = "data";
            const address = document.createElement("div");
            address.className = "address";
            address.textContent = ` ${assetAddressObject.emd} ${assetAddressObject.ji}`;
            const price = document.createElement("div");
            price.className = "price";
            price.textContent = priceToKorean(assetValue.estimatePrice);

            data.append(address);
            if (assetValue.estimatePrice !== null) {
              data.append(price);
            }
            pin?.append(data);
          }, 500);
        })
        .catch((e) => {
          alert("서비스 준비중인 지역입니다.");
        });
    }
  }, [path]);

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
