import React from "react";

import { GeoType } from "../types";

interface IProps {
  data: GeoType | null;
  isLoading: boolean;
}

const Drawer = ({ data, isLoading }: IProps) => {
  return (
    <div className="flex flex-col w-96 bg-white">
      {isLoading ? (
        <div>로딩중</div>
      ) : (
        <div>
          <div>{data?.assetOverviewMulti.assetAddress}</div>
          <div>{data?.assetOverviewMulti.roadNameAddress}</div>
          <div>{data?.assetOverviewMulti.assetName}</div>
          <div>이미지</div>
          <div className="font-bold text-red-500">
            토지:{data?.assetOverviewMulti.landsData.assetLandArea}
          </div>
          <div>건물:{data?.assetOverviewMulti.totalGroundFloorArea}</div>
          <div>추정가:{data?.assetOverviewMulti.assetValue.estimatePrice}</div>
          <div>수익률:4.2%</div>
          <div>구분선</div>
          {data?.assetHistory.buildingHistory ? (
            <div>
              <div>
                {data?.assetHistory.buildingHistory.approvalDate} | 사용승인{" "}
              </div>
              <div>
                공사기간{" "}
                {data?.assetHistory.buildingHistory.constructionDuration}
                개월
              </div>
              <div>
                {data?.assetHistory.buildingHistory.constructionDate} | 착공{" "}
              </div>
              <div>{data?.assetHistory.buildingHistory.permitDate} | 허가 </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Drawer;

/*



*/
