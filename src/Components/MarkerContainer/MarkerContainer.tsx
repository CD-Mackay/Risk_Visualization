import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Marker, Popup } from "react-leaflet";

type Props = {
  dataset: Array<string>;
};

const MarkerContainer = ({ dataset }: Props) => {

  const icon = L.icon({ iconUrl: "/images/marker-icon.png" });

  const showMarkers = (input: Array<string>) => {
    return input.map((element, index) => {
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
