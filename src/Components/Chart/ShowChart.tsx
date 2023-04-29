import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";

interface ShowChartProps {
  dataset: Array<string>;
  geoData: {
    lat: number;
    lng: number;
  };
  chartParam: {
    param: string;
    currentValue: string;
  };
}

const ShowChart = ({ dataset, geoData, chartParam }: ShowChartProps) => {
  Chart.register(...registerables);

  const result: { [key: string]: number[] } = {
    "2030": [],
    "2040": [],
    "2050": [],
    "2060": [],
    "2070": [],
  };

  dataset
    .map((element) => {
      return {
        assetName: element[0],
        riskRating: Number(element[4]),
        year: element[6],
      };
    })
    .forEach(
      (element: { assetName: string; riskRating: number; year: string }) => {
        result[element.year].push(element.riskRating);
      }
    );
  const final: any = [];
  Object.values(result).forEach((element) => {
    final.push(element.reduce((a, b) => a + b, 0) / element.length);
  });

  const options = {
    scales: {
      y: {
        min: 0,
        max: 1,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Risk Data over Time",
      },
    },
  };

  const data = {
    labels: [2030, 2040, 2050, 2060, 2070],
    datasets: [
      {
        label: `Risk Rating by decade for ${chartParam.param} ${chartParam.param !== "location"
        ? chartParam.currentValue
        : `latitude: ${geoData.lat} / longtitude: ${geoData.lng}`}`,
        data: final,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
};

export default ShowChart;
