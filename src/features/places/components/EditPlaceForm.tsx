import Form from "../../form/components/Form";
import { FormDatas } from "../../form/form";
import { useNavigate, useParams } from "react-router-dom";
import { Place } from "../place";
import useAPIRequest from "../../../hooks/useAPIRequest";
import { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../shared/store/store";

const EditPlaceForm = () => {
  const navigate = useNavigate();
  const { placeId } = useParams();
  const { data: authData } = useSelector((state: RootState) => state.auth);
  const { data, MakeRequest } = useAPIRequest<{ place: Place }>();

  const FetchPlace = useCallback(async () => {
    if (placeId) {
      await MakeRequest(
        `${import.meta.env.VITE_HOST_URL}api/places/${placeId}`,
        {
          method: "GET",
        }
      );
    }
  }, [MakeRequest, placeId]);

  useEffect(() => {
    FetchPlace();
  }, [FetchPlace]);

  const initialForm: FormDatas = {
    title: {
      value: data?.place?.title ?? "",
      isValid: true,
      isClicked: false,
      validators: [{ type: "REQUIRED" }],
      errorMessages: [],
      fieldType: "input",
      inputType: "text",
    },
    description: {
      value: data?.place?.description ?? "",
      isValid: true,
      isClicked: false,
      validators: [{ type: "REQUIRED" }, { type: "MINCHARS", customiser: 5 }],
      errorMessages: [],
      fieldType: "textarea",
    },
    address: {
      value: data?.place?.address ?? "",
      isValid: true,
      isClicked: false,
      validators: [{ type: "REQUIRED" }],
      errorMessages: [],
      fieldType: "input",
      inputType: "text",
    },

    isValid: true,
  };

  const SuccessEditPlace = () => {
    navigate(-1);
  };

  const AttemptEditPlace = async (formData: Record<string, string | File>) => {
    MakeRequest(
      `${import.meta.env.VITE_HOST_URL}api/places/${placeId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + authData.token,
        },
        body: JSON.stringify({ ...formData }),
      },
      SuccessEditPlace
    );
  };

  return (
    <>
      {data ? (
        <Form
          initialForm={initialForm}
          submitAction={AttemptEditPlace}
          submitText="Edit place"
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default EditPlaceForm;
