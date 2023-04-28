import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";

interface ShowChartProps {
  dataset: Array<string>;
  headers: Array<string>;
}

const ShowChart = ({ dataset, headers }: ShowChartProps) => {
  Chart.register(...registerables);

  //Implement a line graph component that displays the Risk Rating over time (Year) for a selected location (Lat, Long)

  const result: { [key: string]: number[] } = {
    "2030": [],
    "2040": [],
    "2050": [],
    "2060": [],
    "2070": [],
  };

  const chartData = dataset
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

  console.log("final", final, result);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const data = {
    labels: [2030, 2040, 2050, 2060, 2070],
    datasets: [
      {
        label: dataset[0],
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
