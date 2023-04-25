import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";


const ShowMap = () => {
  const [geoData, setGeoData] = useState({ lat: 64.536634, lng: 16.779852 });

  const icon = L.icon({ iconUrl: "/images/marker-icon.png"})

  const center: [number, number] = [geoData.lat, geoData.lng];

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: "40vh", width: '40hw' }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geoData.lat && geoData.lng && (
        <Marker position={center} icon={icon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default ShowMap;
