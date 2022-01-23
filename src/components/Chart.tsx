import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";

Chart.register(ArcElement);
// import { ChartOptions } from "chart.js";

interface IProps {
  mainColor: string;
  subColor: string;
}

const DoughnutChart = ({ mainColor, subColor }: IProps) => {
  const data = {
    datasets: [
      {
        label: "My First Dataset",
        data: [400, 100],
        backgroundColor: [mainColor, subColor],
        hoverOffset: 2,
      },
    ],
  };

  return (
    <>
      <Doughnut data={data}></Doughnut>
    </>
  );
};

export default DoughnutChart;
