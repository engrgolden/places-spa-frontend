import { Provider, useSelector } from "react-redux";
import store from "./shared/store/store";
import { RootState } from "./shared/store/store";
import ReactDOM from "react-dom";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Loading from "./shared/components/UIElements/Loading";
import ParticlesBackground from "./shared/components/UIElements/ParticlesBackground";

const Overlay = lazy(() => import("./features/overlay/components/Overlay"));
const MainNavigation = lazy(
  () => import("./shared/components/Navigation/MainNavigation")
);
const AllUsers = lazy(() => import("./features/users/pages/AllUsers"));
const UserPlaces = lazy(() => import("./features/places/pages/UserPlaces"));
const NewPlace = lazy(() => import("./features/places/pages/NewPlace"));
const EditPlace = lazy(() => import("./features/places/pages/EditPlace"));
const Authenticate = lazy(() => import("./features/auth/pages/Authenticate"));

const ProvidedApp = () => {
  //overlay plug
  const overlayElement = document.getElementById("overlay");
  const { show: showState } = useSelector((state: RootState) => state.overlays);
  const { isAuthenticated } = useAuth();

  return (
    <>
      {showState &&
        overlayElement !== null &&
        ReactDOM.createPortal(<Overlay />, overlayElement)}
      <MainNavigation />
      <ParticlesBackground />
      <Routes>
        <Route path="/" element={<AllUsers />} />
        <Route path="/:id/places" element={<UserPlaces />} />
        {isAuthenticated && (
          <>
            <Route path="/:placeId/edit" element={<EditPlace />} />
            <Route path="/new-place" element={<NewPlace />} />
          </>
        )}
        <Route path="/login" element={<Authenticate type="login" />} />
        <Route path="/register" element={<Authenticate type="register" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense
          fallback={
            <div>
              <Loading />
            </div>
          }
        >
          <ProvidedApp />
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
