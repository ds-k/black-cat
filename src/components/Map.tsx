import React, { useEffect } from "react";

const Map = () => {
  useEffect(() => {
    let mapDiv = document.getElementById("map");
    let position = new naver.maps.LatLng(37.50619726782106, 127.06353904199999);
    let map = new naver.maps.Map(mapDiv as HTMLElement, {
      center: position,
      zoom: 17,
    });

    var markerOptions = {
      position,
      map,
      title: "pin",
      icon: {
        url: "/pin.svg",
        anchor: new naver.maps.Point(100, 200),
      },
    };

    let marker = new naver.maps.Marker(markerOptions);
    naver.maps.Event.addListener(map, "click", (e) => {
      marker.setPosition(e.latlng);
      let pin = document.querySelectorAll("div[title='pin']")[0];
      console.log(pin);

      pin.animate([{ transform: "rotate(360deg) " }], {
        duration: 1000,
      });
    });
  }, []);

  return (
    <div>
      <div id="map" style={{ width: "100vw", height: "100vh" }}></div>
    </div>
  );
};

export default Map;
