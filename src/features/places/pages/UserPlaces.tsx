import { useParams, useNavigate } from "react-router-dom";
import PlaceItem from "../components/PlaceItem";
import Loading from "../../../shared/components/UIElements/Loading";
import Information from "../../../shared/components/UIElements/Information";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../shared/store/store";
import { useState, useEffect } from "react";
import { fetchUserPlaces } from "../placesSlice";

const UserPlaces = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [refresh, setRefresh] = useState(1);
  const { id } = useParams();
  const { places, loading, error } = useSelector(
    (state: RootState) => state.places
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchUserPlaces(id));
    }
  }, [dispatch, id, refresh]);

  const output = loading ? (
    <Loading />
  ) : error === "empty" ? (
    <>
      <div className="h-8"></div>
      <Information
        text={"This user has not created a place!"}
        needsCancel={false}
        isError={true}
        proceed="Go Back"
        proceedHandler={() => navigate("/")}
      />
    </>
  ) : error ? (
    <>
      <div className="h-8"></div>
      <Information
        text={error}
        needsCancel={false}
        isError={true}
        proceed="REFRESH"
        proceedHandler={() => setRefresh((old) => old + 1)}
      />
    </>
  ) : (
    <section className="my-4 flex flex-col gap-4 items-center">
      {places.map((place) => {
        return <PlaceItem key={place.id} placeData={place} />;
      })}
    </section>
  );

  return output;
};

export default UserPlaces;
