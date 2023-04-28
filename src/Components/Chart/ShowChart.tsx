import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";


interface ShowChartProps {
  dataset: Array<string>;
  headers: Array<string>;
}

const ShowChart = ({ dataset, headers }: ShowChartProps) => {
  const risks = JSON.parse(dataset[0][5]);
  Chart.register(...registerables);

  const chartHeaders = Object.keys(risks);
  const chartData = Object.values(risks);
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
    labels: chartHeaders,
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
