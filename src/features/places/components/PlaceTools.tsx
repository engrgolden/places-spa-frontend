import { useNavigate } from "react-router-dom";
import { RootState } from "../../../shared/store/store";
import { useDispatch, useSelector } from "react-redux";
import { show } from "../../overlay/overlaysSlice";

import Button from "../../../shared/components/UIElements/Button";

const PlaceTools: React.FC<{
  name: string;
  placeId: string;
  creatorId: string;
  coordinates: { lat: number; lng: number };
}> = ({ name, coordinates, placeId, creatorId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state: RootState) => state.auth);
  const viewMapHandler = () => {
    dispatch(
      show({
        name: "placeMap",
        data: {
          name,
          apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
          coordinates,
        },
      })
    );
  };

  const editHandler = () => {
    navigate(`/${placeId}/edit`);
  };

  const attemptDeleteHandler = () => {
    dispatch(
      show({
        name: "delete",
        data: { id: placeId },
      })
    );
  };

  return (
    <>
      <section className="flex justify-center items-center gap-2 p-4">
        <Button
          customStyle="border text-red-500 border-red-500 bg-white text-red-700 "
          onClick={viewMapHandler}
          text="VIEW MAP"
        />
        {data?.id === creatorId ? (
          <>
            <Button
              customStyle="text-white bg-red-500"
              onClick={editHandler}
              text="EDIT"
            />

            <Button
              customStyle="text-white bg-red-800"
              onClick={attemptDeleteHandler}
              text="DELETE"
            />
          </>
        ) : null}
      </section>
    </>
  );
};

export default PlaceTools;
