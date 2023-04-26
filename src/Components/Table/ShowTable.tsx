import "leaflet/dist/leaflet.css";

interface ShowTableProps {
  dataset: Array<string>;
  headers: Array<string>;
}

const ShowTable = ({ dataset, headers }: ShowTableProps) => {

  return (
    <p>I am ShowTable</p>
  );
};

export default ShowTable;
