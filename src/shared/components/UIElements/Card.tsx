import { ReactNode } from "react";

const Card: React.FC<{ children: ReactNode; classNames?: string }> = ({
  children,
  classNames,
}) => {
  return (
    <>
      <div
        className={`bg-white  text-black rounded-lg flex flex-col ${classNames}`}
        onClick={(event) => event?.stopPropagation()}
      >
        {children}
      </div>
    </>
  );
};

export default Card;
