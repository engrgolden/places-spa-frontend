import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import { useMediaQuery } from "react-responsive";
import { show } from "../../../features/overlay/overlaysSlice";
import { useDispatch } from "react-redux";

const MainNavigation = () => {
  const dispatch = useDispatch();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const showDrawerHandler = () => {
    dispatch(show({ name: "sideDrawer" }));
  };
  return (
    <>
      <div className=" bg-pink-700 text-white flex items-center justify-between sm:justify-normal">
        {isTabletOrMobile && (
          <button
            onClick={showDrawerHandler}
            className="ml-4 mr-1 w-14 h-8 flex flex-col justify-evenly items-center rounded-md hover: border-white  hover:border-2"
          >
            <span className="w-8 h-0.5 bg-white rounded"></span>
            <span className="w-8 h-0.5 bg-white rounded"></span>
            <span className="w-8 h-0.5 bg-white rounded"></span>
          </button>
        )}
        <Link
          className="border font-bold text-2xl m-1 p-2 border-pink-700 rounded hover:border-white "
          to="/"
        >
          Places
        </Link>
        <nav className="w-full flex justify-end">
          <ul className=" mx-4 ">{!isTabletOrMobile && <NavLinks />}</ul>
        </nav>
      </div>
    </>
  );
};

export default MainNavigation;
