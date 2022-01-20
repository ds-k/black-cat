import React, { useEffect } from "react";

const Map = () => {
  useEffect(() => {
    let mapDiv = document.getElementById("map");
    new naver.maps.Map(mapDiv as HTMLElement);
  }, []);

  return (
    <div>
      <div id="map" style={{ width: "100vw", height: "100vh" }}></div>
    </div>
  );
};

export default Map;
