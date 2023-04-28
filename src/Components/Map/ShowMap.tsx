import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerContainer from "../MarkerContainer/MarkerContainer";

interface ShowMapProps {
  dataset: Array<string>;
  center: [number, number];
  geoData: {
    lat: number,
    lng: number
  }

}

const ShowMap = ({ dataset, geoData, center }: ShowMapProps) => {
 

  console.log(geoData)

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: "40vh", width: "40hw" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geoData.lat !== undefined && geoData.lng !== undefined && <MarkerContainer dataset={dataset} />} 
      {/* Should be using On hover tooltips rather than click-popups */}
    </MapContainer>
  );
};

export default ShowMap;
