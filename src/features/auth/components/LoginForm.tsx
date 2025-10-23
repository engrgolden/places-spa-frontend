import Form from "../../form/components/Form";
import { FormDatas } from "../../form/form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "../models/authSlice";
import useAPIRequest from "../../../hooks/useAPIRequest";

const initialForm: FormDatas = {
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
    inputType: "text",
  },

  isValid: false,
};

const LoginForm = () => {
  const { MakeRequest } = useAPIRequest();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const SuccessLogin = (resData: {
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

  const AttemptLogin = async (formData: Record<string, string | File>) => {
    MakeRequest(
      import.meta.env.VITE_HOST_URL + "api/users/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData }),
      },
      SuccessLogin
    );
  };

  return (
    <Form
      initialForm={initialForm}
      submitAction={AttemptLogin}
      submitText="Login"
    />
  );
};

export default LoginForm;
