import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { show, hide } from "../../../features/overlay/overlaysSlice";

const NavLinks: React.FC = () => {
  const { isAuthenticated, data } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();
  const hideDrawerIfOpenHandler = () => {
    dispatch(hide());
  };

  const attemptLogoutHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(hide());
    dispatch(
      show({
        name: "logout",
      })
    );
  };
  return (
    <>
      <Link
        className="w-fit p-2 hover:bg-yellow-500 hover:border hover:border-black"
        onClick={hideDrawerIfOpenHandler}
        to="/"
      >
        ALL USERS
      </Link>
      {isAuthenticated && (
        <>
          <Link
            className="w-fit p-2 hover:bg-yellow-500 hover:border hover:border-black"
            onClick={hideDrawerIfOpenHandler}
            to={`/${data?.id}/places`}
          >
            MY PLACES
          </Link>
          <Link
            className=" w-fit p-2 hover:bg-yellow-500 hover:border hover:border-black"
            onClick={hideDrawerIfOpenHandler}
            to="new-place"
          >
            ADD PLACE
          </Link>{" "}
        </>
      )}
      {!isAuthenticated ? (
        <Link
          className="w-fit p-2 hover:bg-yellow-500 hover:border hover:border-black"
          onClick={hideDrawerIfOpenHandler}
          to="login"
        >
          LOGIN
        </Link>
      ) : (
        <button
          className="w-fit p-2 hover:bg-yellow-500 hover:border hover:border-black"
          onClick={attemptLogoutHandler}
        >
          LOGOUT
        </button>
      )}
    </>
  );
};

export default NavLinks;
