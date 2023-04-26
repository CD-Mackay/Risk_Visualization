import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Marker, Popup } from "react-leaflet";

interface MarkerContainerProps {
  dataset: Array<string>;
}

const MarkerContainer = ({ dataset }: MarkerContainerProps) => {
  const icon = L.icon({ iconUrl: "/images/marker-icon.png" });

  const handleIconColor = (input: number) => {
    if (input < 0.3) {
      return L.icon({
        iconUrl:
          "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2AFA2A&chf=a,s,eeFFFFFF",
      });
    }
    // else if (input < 0.2) {
    //   return L.icon({
    //     iconUrl:
    //       "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|3de398&chf=a,s,ee00FFFF",
    //   });
    // } else if (input < 0.3) {
    //   return L.icon({
    //     iconUrl:
    //       "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|44fdde&chf=a,s,ee00FFFF",
    //   });
    // } else if (input < 0.4) {
    //   return L.icon({
    //     iconUrl:
    //       "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|5195fa&chf=a,s,ee00FFFF",
    //   });
    // } else if (input < 0.5) {
    //   return L.icon({
    //     iconUrl:
    //       "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|3d54e3&chf=a,s,ee00FFFF",
    //   });
    // }
    else if (input < 0.6) {
      return L.icon({
        iconUrl:
          "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|e6f138&chf=a,s,ee00FFFF",
      });
    }
    // else if (input < 0.7) {
    //   return L.icon({
    //     iconUrl:
    //       "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|fa4938&chf=a,s,ee00FFFF",
    //   });
    // } else if (input < 0.8) {
    //   return L.icon({
    //     iconUrl:
    //       "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|e3274f&chf=a,s,ee00FFFF",
    //   });
    // }
    else {
      return L.icon({
        iconUrl:
          "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FC0000&chf=a,s,ee00FFFF",
      });
    }
  };

  const showMarkers = (input: Array<string>) => {
    return input.map((element, index) => {
      return (
        <Marker
          key={index}
          position={[Number(element[1]), Number(element[2])]}
          icon={handleIconColor(Number(element[4]))}
        >
          <Popup key={index}>
            {element[3]} <br /> {element[0]}
          </Popup>
        </Marker>
      );
    });
  };

  const markers = showMarkers(dataset);

  return <>{markers}</>;
};

export default MarkerContainer;
