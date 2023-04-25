import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { NextComponentType } from "next";
import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerContainer from "../MarkerContainer/MarkerContainer";

type Props = {
  dataset: Array<string>
};

const ShowMap: NextComponentType<Props> = ({ dataset }) => {

  const [geoData, setGeoData] = useState({ lat: 64.536634, lng: 16.779852 });

  const icon = L.icon({ iconUrl: "/images/marker-icon.png" });

  const center: [number, number] = [geoData.lat, geoData.lng];

  const showMarkers = () => {
    for (let element in dataset) {
     let lat = parseFloat(element[1]);
     let lng = parseFloat(element[2])

     L.marker([lat, lng]).addTo(map)
    }
  };

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
      {geoData.lat && geoData.lng && (
        <MarkerContainer dataset={dataset} />
      )}
    </MapContainer>
  );
};

export default ShowMap;
