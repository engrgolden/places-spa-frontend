import PlaceContent from "./PlaceContent";
import PlaceTools from "./PlaceTools";
import { Place } from "../place";
const PlaceItem: React.FC<{ placeData: Place }> = ({ placeData }) => {
  return (
    <div className=" w-[98vw] max-w-96 bg-white  flex flex-col rounded-md overflow-hidden">
      <PlaceContent
        name={placeData.title}
        address={placeData.address}
        description={placeData.description}
        imageUrl={placeData.imageUrl}
      />
      <PlaceTools
        name={placeData.title}
        placeId={placeData.id}
        creatorId={placeData.creatorId}
        coordinates={placeData.coordinates}
      />
    </div>
  );
};

export default PlaceItem;
