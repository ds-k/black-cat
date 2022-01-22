import React from "react";
import styled from "styled-components";
import { GeoType } from "../types";

interface IProps {
  data: GeoType | null;
  isLoading: boolean;
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 375px;
  background-color: #ffffff;
`;

const Drawer = ({ data, isLoading }: IProps) => {
  return (
    <Container>{isLoading ? <div>로딩중</div> : <div>데이터</div>}</Container>
  );
};

export default Drawer;
