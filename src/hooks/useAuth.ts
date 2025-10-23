import { useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, unAuth } from "../features/auth/models/authSlice";
import { show } from "../features/overlay/overlaysSlice";
import { RootState } from "../shared/store/store";

export function useAuth() {
  const dispatch = useDispatch();
  const { isAuthenticated, data } = useSelector(
    (state: RootState) => state.auth
  );
  const logoutTimer = useRef<number | null>(null);

  // Auto-login from localStorage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData") || "null");
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.tokenExpirationDate) > new Date()
    ) {
      dispatch(auth({ data: storedData }));
    }
  }, [dispatch]);

  // Logout function
  const logout = useCallback(() => {
    dispatch(unAuth());
    dispatch(
      show({
        name: "error",
        data: { errorMessage: "Oops, session expired, please login." },
      })
    );
  }, [dispatch]);

  // Handle Auto Logout based on Token Expiration
  useEffect(() => {
    if (logoutTimer.current) {
      clearTimeout(logoutTimer.current);
    }

    if (isAuthenticated && data.tokenExpirationDate) {
      const remainingTime =
        new Date(data.tokenExpirationDate).getTime() - new Date().getTime();

      logoutTimer.current = setTimeout(logout, Math.max(remainingTime, 0));
    }

    return () => {
      if (logoutTimer.current) clearTimeout(logoutTimer.current);
    };
  }, [isAuthenticated, logout, data.tokenExpirationDate]);

  return { isAuthenticated };
}
