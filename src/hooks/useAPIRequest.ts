import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { show, hide } from "../features/overlay/overlaysSlice";

const useAPIRequest = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const dispatch = useDispatch();

  const MakeRequest = useCallback(
    async <U extends T>(
      path: string,
      options: {
        method?: string;
        headers?: Record<string, string>;
        body?: string | FormData;
      },
      successAction?: (resData: U) => void
    ) => {
      dispatch(show({ name: "loading" }));
      try {
        const headers =
          options.body instanceof FormData
            ? Object.fromEntries(
                Object.entries(options.headers || {}).filter(
                  ([key]) => key.toLowerCase() !== "content-type"
                )
              )
            : options.headers;
        const res = await fetch(path, { ...options, headers });
        const resData: U = await res.json();

        if (!res.ok && resData) {
          throw new Error(
            typeof resData === "object" &&
            "message" in resData &&
            typeof resData.message === "string"
              ? resData.message
              : "Something went wrong, please try again later."
          );
        }
        dispatch(hide());

        setData(resData as T);
        if (successAction) {
          successAction(resData);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Something went wrong, please try again later.";
        dispatch(show({ name: "error", data: { errorMessage } }));
      }
    },
    [dispatch]
  );
  return { data, MakeRequest };
};

export default useAPIRequest;
