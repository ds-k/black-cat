import React, { useEffect, useState } from "react";
import { GeoType } from "../types";
import { priceToKorean } from "../utils";
import DoughnutChart from "../components/Chart";

interface IProps {
  data: GeoType | null;
  isLoading: boolean;
  isHome: boolean;
}

const Drawer = ({ data, isLoading, isHome }: IProps) => {
  const [addressType, setAddressType] = useState(true);

  const handleAddress = (e: any) => {
    if (data && data.assetOverviewMulti.roadNameAddress) {
      setAddressType(!addressType);
    }
  };

  useEffect(() => {
    setAddressType(true);
  }, [data]);

  useEffect(() => {
    let pinAddress = document.querySelector(".address");
    if (addressType && pinAddress && data) {
      pinAddress.textContent = data.assetOverviewMulti.assetAddress
        .trim()
        .replaceAll("  ", " ")
        .split(" ")
        .slice(2)
        .join(" ");
    } else if (!addressType && pinAddress && data) {
      pinAddress.textContent = data.assetOverviewMulti.roadNameAddress
        .trim()
        .replaceAll("  ", " ")
        .split(" ")
        .slice(2)
        .join(" ");
    }
  }, [addressType]);

  return (
    <div className="flex flex-col w-96 bg-white shadow-xl">
      {!isLoading && data ? (
        <div className="w-96  h-full">
          <nav className="flex h-14 py-1 pr-1 items-center">
            <img src="/logo.svg" alt="logo" />
            <div className="flex items-center justify-between w-11/12 h-full border border-#ccc outline-none px-2">
              <input className="font-main text-black w-full h-full outline-none pl-1"></input>
              <img
                className="w-7 h-7 cursor-pointer"
                src="/search.svg"
                alt="search"
              />
            </div>
          </nav>
          <section className="flex justify-between px-7 py-5">
            <div className="flex flex-col">
              {addressType ? (
                <span
                  className="font-main text-black font-bold text-lg cursor-pointer tracking-tighter"
                  onClick={handleAddress}
                >
                  {data.assetOverviewMulti.assetAddress}
                </span>
              ) : (
                <span
                  className="font-main text-black font-bold text-lg cursor-pointer tracking-tighter"
                  onClick={handleAddress}
                >
                  {data.assetOverviewMulti.roadNameAddress}
                </span>
              )}
              <span className="font-main text-main tracking-tighter">
                {data.assetOverviewMulti.assetName}
              </span>
            </div>
            <img src="/like.svg" alt="like" />
          </section>
          <img className="w-96 h-56" src="/picture.png" alt="default"></img>
          <section className="flex justify-center mt-4 w-full h-24 gap-x-3 ">
            <div className="flex items-center justify-center w-20">
              <DoughnutChart
                mainColor="#ffcfe7"
                subColor="#ffcfe7"
              ></DoughnutChart>
              <div className="fixed z-10 font-main text-xs text-black">
                토지
              </div>
            </div>
            <div className="flex items-center justify-center w-20">
              <DoughnutChart
                mainColor="#9b9b9b"
                subColor="#9b9b9b"
              ></DoughnutChart>
              <div className="fixed z-10 font-main text-xs text-black">
                건물
              </div>
            </div>
            <div className="flex items-center justify-center w-20">
              <DoughnutChart
                mainColor="#e8b36a"
                subColor="#6a91e8"
              ></DoughnutChart>
              <div className="fixed z-10 font-main text-xs text-black">
                추정가
              </div>
            </div>
            <div className="flex items-center justify-center w-20">
              <DoughnutChart
                mainColor="#faa2a2"
                subColor="#9dd9a0"
              ></DoughnutChart>
              <div className="fixed z-10 font-main text-xs text-black">
                수익률
              </div>
            </div>
          </section>
          <section className="w-full flex flex-col text-lg text-black font-main pl-12 pr-7 gap-y-1 mt-10">
            <div className="flex w-full justify-between">
              <div className="font-bold w-1/3 ">토지</div>
              <div className="w-2/3 flex justify-between">
                <span>
                  {data.assetOverviewMulti.landsData.assetLandArea} m²
                </span>
                <img src="/arrow.svg" alt="arrow"></img>
              </div>
            </div>
            <div className="flex w-full justify-between">
              <div className="font-bold w-1/3 ">건물</div>
              <div className="w-2/3 flex justify-between">
                <span>{data.assetOverviewMulti.totalGroundFloorArea} m²</span>
                <img src="/arrow.svg" alt="arrow"></img>
              </div>
            </div>
            <div className="flex w-full justify-between">
              <div className="font-bold w-1/3 ">추정가</div>
              <div className="w-2/3 flex justify-between">
                <span>
                  {priceToKorean(
                    data.assetOverviewMulti.assetValue.estimatePrice
                  )}
                  원
                </span>
                <img src="/arrow.svg" alt="arrow"></img>
              </div>
            </div>
            <div className="flex w-full justify-between">
              <div className="font-bold w-1/3 ">수익률</div>
              <div className="w-2/3 flex justify-between">
                <span>4.2%</span>
                <img src="/arrow.svg" alt="arrow"></img>
              </div>
            </div>
          </section>
          {data.assetHistory.buildingHistory ? (
            <section className="pl-12 mt-10  text-black font-main gap-y-3">
              {data.assetHistory.buildingHistory.approvalDate ? (
                <div className="mt-2 text-lg">
                  {data.assetHistory.buildingHistory.approvalDate.replaceAll(
                    "-",
                    "."
                  )}{" "}
                  사용승인{" "}
                </div>
              ) : null}
              {data.assetHistory.buildingHistory.constructionDuration ? (
                <div className="mt-2 text-md">
                  공사기간{" "}
                  {data.assetHistory.buildingHistory.constructionDuration}
                  개월
                </div>
              ) : null}
              {data.assetHistory.buildingHistory.constructionDate ? (
                <div className="mt-2 text-lg">
                  {data.assetHistory.buildingHistory.constructionDate.replaceAll(
                    "-",
                    "."
                  )}{" "}
                  착공{" "}
                </div>
              ) : null}
              {data.assetHistory.buildingHistory.permitDate ? (
                <div className="mt-2 text-lg">
                  {data.assetHistory.buildingHistory.permitDate.replaceAll(
                    "-",
                    "."
                  )}{" "}
                  허가{" "}
                </div>
              ) : null}
            </section>
          ) : null}
        </div>
      ) : isHome ? (
        <div className="flex flex-col items-center justify-center w-96 h-full ">
          <img src="/logo.svg" alt="logo" className="animate-bounce" />
          <span className="text-lg font-main text-black">
            정보가 필요한 곳을 <br />
          </span>
          <span className="text-lg font-main text-black">클릭해주세요.</span>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-96 h-full ">
          <img src="/logo.svg" alt="logo" className="animate-spin" />
          <span className="text-lg font-main text-black ">
            정보를 불러오는 중입니다.
          </span>
        </div>
      )}
    </div>
  );
};

export default Drawer;

/*



*/
