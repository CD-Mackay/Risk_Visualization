interface ShowChartProps {
  dataset: Array<string>;
  headers: Array<string>;
}

const ShowChart = ({ dataset, headers }: ShowChartProps) => {
  console.log(dataset,headers);
  return <div>{/* <Line /> */}</div>;
};

export default ShowChart;
