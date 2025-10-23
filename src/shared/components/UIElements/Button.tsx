import { ButtonHTMLAttributes } from "react";

type CustomButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  customStyle?: string;
  text: string;
};

const Button: React.FC<CustomButtonProps> = ({
  text,
  customStyle = "",
  ...props
}) => {
  return (
    <button
      className={`bg-pink-700 w-fit 2xs:p-2 2xs:px-6 p-1 px-3 rounded-md text-xs ${customStyle}`}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
