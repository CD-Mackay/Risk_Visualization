import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerContainer from "../MarkerContainer/MarkerContainer";

interface Props {
  dataset: Array<string>;
};

const ShowMap = ({ dataset }: Props) => {
  const [geoData, setGeoData] = useState({ lat: 53.51684, lng: -113.3187 });

  const center: [number, number] = [geoData.lat, geoData.lng];

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
      {geoData.lat && geoData.lng && <MarkerContainer 
      dataset={dataset} 
      />}
    </MapContainer>
  );
};

export default ShowMap;
