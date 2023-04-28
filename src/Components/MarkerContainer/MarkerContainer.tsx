import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Marker, Tooltip } from "react-leaflet";

interface MarkerContainerProps {
  dataset: Array<string>;
  handleChangeCenter: Function
}

const MarkerContainer = ({ dataset, handleChangeCenter }: MarkerContainerProps) => {
  const icon = L.icon({ iconUrl: "/images/marker-icon.png" });

  const handleIconColor = (input: number) => {
    if (input < 0.3) {
      return L.icon({
        iconUrl:
          "/images/green-marker-icon.png",
      });
    }
    else if (input < 0.7) {
      return L.icon({
        iconUrl:
          "/images/yellow-marker-icon.png",
      });
    }
    else {
      return L.icon({
        iconUrl:
          "/images/red-marker-icon.png",
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
          eventHandlers={{
            click: (e) => {
              handleChangeCenter(Number(element[1]), Number(element[2]))
            },
          }}
        >
          <Tooltip key={index}>
            {element[3]} <br /> {element[0]}
          </Tooltip>
        </Marker>
      );
    });
  };

  const markers = showMarkers(dataset);

  return <>{markers}</>;
};

export default MarkerContainer;
