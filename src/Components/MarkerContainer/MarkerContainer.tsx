import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { NextComponentType } from "next";
import { useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";

type Props = {
  dataset: Array<string>;
};

const MarkerContainer: NextComponentType<Props> = ({ dataset }) => {
  const map = useMap();
  console.log("MarkerContainer:", dataset);

  const [geoData, setGeoData] = useState({ lat: 64.536634, lng: 16.779852 });

  const icon = L.icon({ iconUrl: "/images/marker-icon.png" });

  const showMarkers = (input: Array<string>) => {
    return input.map((element, index) => {
      console.log(element);
      return (
        <Marker key={index} position={[Number(element[1]), Number(element[2])]} icon={icon}>
          <Popup key={index}>A popup</Popup>
        </Marker>
      );
    });
  };

  const markers = showMarkers(dataset);

  return <>{markers}</>;
};

export default MarkerContainer;
