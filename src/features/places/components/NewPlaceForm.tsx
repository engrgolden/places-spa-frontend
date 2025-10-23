import Form from "../../form/components/Form";
import { FormDatas } from "../../form/form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../shared/store/store";
import useAPIRequest from "../../../hooks/useAPIRequest";

const initialForm: FormDatas = {
  title: {
    value: "",
    isValid: false,
    isClicked: false,
    validators: [{ type: "REQUIRED" }],
    errorMessages: [],
    fieldType: "input",
    inputType: "text",
  },
  description: {
    value: "",
    isValid: false,
    isClicked: false,
    validators: [{ type: "REQUIRED" }, { type: "MINCHARS", customiser: 5 }],
    errorMessages: [],
    fieldType: "textarea",
  },
  address: {
    value: "",
    isValid: false,
    isClicked: false,
    validators: [{ type: "REQUIRED" }],
    errorMessages: [],
    fieldType: "input",
    inputType: "text",
  },
  image: {
    value: null,
    isValid: false,
    isClicked: false,
    validators: [
      { type: "REQUIREDFILE" },
      { type: "MAXSIZEFILE", customiser: 500 * 1024 },
    ],
    errorMessages: [],
    fieldType: "input",
    inputType: "file",
  },

  isValid: false,
};

const NewPlaceForm = () => {
  const { data } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const { MakeRequest } = useAPIRequest();

  const SuccessAddNewPlace = () => {
    navigate(-1);
  };

  const AttemptAddNewPlace = async (
    formDatas: Record<string, string | File>
  ) => {
    const formData = new FormData();
    formData.append("title", formDatas.title);
    formData.append("description", formDatas.description);
    formData.append("address", formDatas.address);
    formData.append("image", formDatas.image);
    MakeRequest(
      import.meta.env.VITE_HOST_URL + "api/places",
      {
        method: "POST",
        headers: { authorization: "Bearer " + data.token },
        body: formData,
      },
      SuccessAddNewPlace
    );
  };

  return (
    <Form
      initialForm={initialForm}
      submitAction={AttemptAddNewPlace}
      submitText="Add place"
    />
  );
};

export default NewPlaceForm;
