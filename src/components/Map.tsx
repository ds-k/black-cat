import axios from "axios";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import customAxios from "../customAxios";
import { GeoType } from "../types";

interface IProps {
  data: GeoType | null;
  setData: Dispatch<SetStateAction<GeoType | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
const Container = styled.div`
  width: 100%;
`;

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
            anchor: new naver.maps.Point(100, 200),
          },
        };
        marker = new naver.maps.Marker(markerOptions);
      } else {
        marker.setPosition(e.latlng);
      }

      let pin = document.querySelector("div[title='pin']");

      let container = document.querySelector(".container");
      if (container) {
        pin?.removeChild(container);
      }

      axios
        .get(
          "https://vos.land/api/asset/all-processed-data?asset_pnu=1168010600110020000"
        )
        .then((res) => {
          setData(res.data);
          setIsLoading(false);
          let container = document.createElement("div");
          container.className = "container";
          container.style.width = "inherit";
          container.style.height = "inherit";
          container.style.display = "flex";
          container.style.justifyContent = "center";
          container.style.flexDirection = "column";
          container.style.alignItems = "center";
          container.style.zIndex = "2";
          container.style.position = "fixed";
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
        });
    });
  }, []);

  return (
    <Container>
      <div id="map" style={{ height: "100vh" }}></div>
    </Container>
  );
};

export default Map;
