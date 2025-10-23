import { useDispatch } from "react-redux";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { hide } from "../../overlay/overlaysSlice";
const PlaceMap: React.FC<{
  apiKey: string;
  name: string;
  coordinates: { lat: number; lng: number };
}> = ({ coordinates, name, apiKey }) => {
  const dispatch = useDispatch();
  const mapElement = (
    <APIProvider apiKey={apiKey}>
      <Map
        className="w-full h-full"
        defaultCenter={coordinates}
        defaultZoom={15}
        gestureHandling={"greedy"}
        mapId={"99d057a14f45b3f0"}
        disableDefaultUI={true}
        zoomControl={true}
      >
        <AdvancedMarker position={coordinates} />
      </Map>
    </APIProvider>
  );

  return (
    <div
      className="z-20 w-[90vw] max-w-96 h-96 bg-blue-950 rounded-lg overflow-hidden shadow-lg border flex flex-col"
      onClick={(event) => event.stopPropagation()}
    >
      <p className="w-full z-30 m-4 text-white font-extrabold xs:text-2xl text-md">
        {name}
      </p>
      {mapElement}
      <div className="w-full z-30 bg-white flex justify-end">
        <button
          onClick={() => dispatch(hide())}
          className="bg-red-600 text-white text-xs rounded m-4 py-2 px-4"
        >
          CLOSE
        </button>
      </div>
    </div>
  );
};

export default PlaceMap;
