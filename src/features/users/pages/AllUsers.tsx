import UserItem from "../components/UserItem";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { AppDispatch, RootState } from "../../../shared/store/store";
import { fetchUsers } from "../usersSlice";
import Loading from "../../../shared/components/UIElements/Loading";
import Information from "../../../shared/components/UIElements/Information";

const AllUsers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [refresh, setRefresh] = useState(1);
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch, refresh]);

  const output = loading ? (
    <Loading />
  ) : error === "empty" ? (
    <>
      <div className="h-8"></div>
      <Information
        text={"No users found!"}
        needsCancel={false}
        isError={true}
        proceed="Register"
        proceedHandler={() => navigate("/register")}
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
    <section className="my-4 flex flex-col items-center gap-4">
      {users.map((userData) => (
        <UserItem
          key={userData.id}
          id={userData.id}
          name={userData.name}
          placeCount={userData.places.length}
          imageUrl={userData.imageUrl}
        />
      ))}
    </section>
  );

  return output;
};

export default AllUsers;
