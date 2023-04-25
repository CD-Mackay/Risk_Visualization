import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Marker, Popup } from "react-leaflet";

interface MarkerContainerProps {
  dataset: Array<string>;
};

const MarkerContainer = ({ dataset }: MarkerContainerProps) => {

  const icon = L.icon({ iconUrl: "/images/marker-icon.png" });

  const handleIconColor = (input:number) => {
    if (input < 0.5) {
      return L.icon({ iconUrl: "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|abcdef&chf=a,s,ee00FFFF" }) 
    } else {
      return L.icon({ iconUrl: "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF"}) 
    }
  }


  const showMarkers = (input: Array<string>) => {
    return input.map((element, index) => {
      return (
        <Marker key={index} position={[Number(element[1]), Number(element[2])]} icon={handleIconColor(Number(element[4]))}>
          <Popup key={index}>
            {element[4]}
          </Popup>
        </Marker>
      );
    });
  };

  const markers = showMarkers(dataset);

  return <>{markers}</>;
};

export default MarkerContainer;
