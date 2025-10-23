import { RootState } from "../../../shared/store/store";
import PlaceMap from "../../places/components/PlaceMap";
import SideDrawer from "../../../shared/components/Navigation/SideDrawer";
import OverlayWrapper from "./OverlayWrapper";
import Information from "../../../shared/components/UIElements/Information";
import { useSelector, useDispatch } from "react-redux";
import { hide } from "../overlaysSlice";
import { unAuth } from "../../auth/models/authSlice";
import Backdrop from "../../../shared/components/UIElements/Backdrop";
import Loading from "../../../shared/components/UIElements/Loading";
import useAPIRequest from "../../../hooks/useAPIRequest";
import { useNavigate } from "react-router-dom";

const Overlay: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const placeId = useSelector((state: RootState) => state.overlays.data?.id);
  const { name, data } = useSelector((state: RootState) => state.overlays);
  const { data: authData } = useSelector((state: RootState) => state.auth);
  const { MakeRequest } = useAPIRequest();

  const SuccessDeletePlace = () => {
    navigate(".", { replace: true });
  };

  const AttemptDeletePlace = async () => {
    dispatch(hide());
    MakeRequest(
      `${import.meta.env.VITE_HOST_URL}api/places/${placeId}`,
      {
        method: "DELETE",
        headers: { authorization: "Bearer " + authData.token },
      },
      SuccessDeletePlace
    );
  };

  const logoutHandler = () => {
    dispatch(hide());
    dispatch(unAuth());
    navigate("/");
  };
  let output;
  let closeable = true;

  switch (name) {
    case "logout":
      output = (
        <OverlayWrapper>
          <Information
            text="Are you sure you want to logout."
            proceed="LOGOUT"
            proceedHandler={logoutHandler}
          />
        </OverlayWrapper>
      );

      break;
    case "placeMap":
      output = data && (
        <OverlayWrapper>
          <PlaceMap
            apiKey={data?.apiKey as string}
            name={data?.name as string}
            coordinates={data?.coordinates as { lat: number; lng: number }}
          />
        </OverlayWrapper>
      );

      break;
    case "error":
      output = data && (
        <OverlayWrapper>
          <Information text={data?.errorMessage as string} isError={true} />
        </OverlayWrapper>
      );

      break;
    case "sideDrawer":
      output = <SideDrawer />;

      break;
    case "loading":
      output = <Loading />;
      closeable = false;
      break;
    case "delete":
      output = (
        <OverlayWrapper>
          <Information
            text="Do you want to delete this place? Please note this action cannot be
            reversed."
            proceed="DELETE"
            proceedHandler={AttemptDeletePlace}
          />
        </OverlayWrapper>
      );

      break;

    default:
      output = <></>;
  }

  return <Backdrop closeable={closeable}>{output}</Backdrop>;
};

export default Overlay;
