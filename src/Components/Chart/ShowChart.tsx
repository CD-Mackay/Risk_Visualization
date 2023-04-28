import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";

interface ShowChartProps {
  dataset: Array<string>;
  headers: Array<string>;
}

const ShowChart = ({ dataset, headers }: ShowChartProps) => {
  Chart.register(...registerables);

  //Implement a line graph component that displays the Risk Rating over time (Year) for a selected location (Lat, Long)

  const result = {}
  const chartData = dataset
  .map((element) => {
    return {
      assetName: element[0],
      riskRating: Number(element[4]),
      year: Number(element[6]),
    };
  })
  .sort(
    (element1, element2) => (element1.year > element2.year) ? 1 : (element1.year < element2.year) ? -1 : 0
  )

  

  // .forEach((element: {assetName: string, riskRating: number, year: number}) => {
  //   if (!result[element.year]) {
  //     result[element.year] = [element.riskRating]
  //   } else {
  //     result[element.year].push(element.riskRating)
  //   }
  // })
  

  console.log("sortedData", chartData);

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
        data: chartData,
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
