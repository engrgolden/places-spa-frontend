import Form from "../../form/components/Form";
import { FormDatas } from "../../form/form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "../models/authSlice";
import useAPIRequest from "../../../hooks/useAPIRequest";

const initialForm: FormDatas = {
  name: {
    value: "",
    isValid: true,
    isClicked: true,
    validators: [{ type: "REQUIRED" }],
    errorMessages: [],
    fieldType: "input",
    inputType: "text",
  },
  email: {
    value: "",
    isValid: false,
    isClicked: false,
    validators: [{ type: "EMAIL" }, { type: "MINCHARS", customiser: 3 }],
    errorMessages: [],
    fieldType: "input",
    inputType: "text",
  },
  password: {
    value: "",
    isValid: false,
    isClicked: false,
    validators: [{ type: "REQUIRED" }, { type: "MINCHARS", customiser: 8 }],
    errorMessages: [],
    fieldType: "input",
    inputType: "password",
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

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { MakeRequest } = useAPIRequest();

  const SuccessRegister = (resData: {
    email: string;
    id: string;
    token: string;
  }) => {
    dispatch(
      auth({
        data: resData,
      })
    );
    navigate("/");
  };

  const AttemptRegister = async (formDatas: Record<string, string | File>) => {
    const formData = new FormData();
    formData.append("email", formDatas.email);
    formData.append("name", formDatas.name);
    formData.append("password", formDatas.password);
    formData.append("image", formDatas.image);
    MakeRequest(
      import.meta.env.VITE_HOST_URL + "api/users/register",
      {
        method: "POST",
        body: formData,
      },
      SuccessRegister
    );
  };

  return (
    <Form
      initialForm={initialForm}
      submitAction={AttemptRegister}
      submitText="Register"
    />
  );
};

export default RegisterForm;
