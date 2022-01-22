import React, { useState } from "react";
import styled from "styled-components";
import Drawer from "./components/Drawer";
import Map from "./components/Map";
import GlobalStyle from "./styles/GlobalStyle";
import { GeoType } from "./types";

const Container = styled.div`
  display: flex;
`;

const App = () => {
  const [data, setData] = useState<GeoType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div>
      <GlobalStyle></GlobalStyle>
      <Container>
        <Drawer data={data} isLoading={isLoading}></Drawer>
        <Map data={data} setData={setData} setIsLoading={setIsLoading}></Map>
      </Container>
    </div>
  );
};

export default App;
