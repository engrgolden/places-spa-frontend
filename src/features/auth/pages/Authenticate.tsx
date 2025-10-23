import Button from "../../../shared/components/UIElements/Button";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { useNavigate } from "react-router-dom";
const Authenticate: React.FC<{ type: "login" | "register" }> = ({ type }) => {
  const navigate = useNavigate();

  const output = (
    <div className="mt-20 bg-white w-10/12 mx-auto rounded-lg shadow flex flex-col">
      {type === "login" ? <LoginForm /> : <RegisterForm />}
      <div className="self-end  flex items-center gap-4 m-4 text-xs">
        <p>
          {type === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
        </p>
        <Button
          text={type === "login" ? "Register" : "Login"}
          customStyle="p-1 bg-green-600 text-white font-bold"
          onClick={() => {
            return type === "login"
              ? navigate("/register")
              : navigate("/login");
          }}
        />
      </div>
    </div>
  );

  return output;
};

export default Authenticate;
