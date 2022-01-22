import React, { useState } from "react";
import Drawer from "./components/Drawer";
import Map from "./components/Map";
import { GeoType } from "./types";

const App = () => {
  const [data, setData] = useState<GeoType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div>
      <div className="flex">
        <Drawer data={data} isLoading={isLoading}></Drawer>
        <Map data={data} setData={setData} setIsLoading={setIsLoading}></Map>
      </div>
    </div>
  );
};

export default App;
