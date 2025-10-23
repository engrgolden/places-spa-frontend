import Card from "./Card";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { hide } from "../../../features/overlay/overlaysSlice";

const Information: React.FC<{
  text: string;
  needsCancel?: boolean;
  isError?: boolean;
  proceed?: string;
  proceedHandler?: () => void;
}> = ({
  text,
  needsCancel = true,
  isError = false,
  proceed = "",
  proceedHandler,
}) => {
  const dispatch = useDispatch();

  return (
    <Card classNames="w-[90vw] max-w-96 mx-auto p-0 overflow-hidden">
      <h1
        className={`font-bold p-3 text-white ${
          isError ? "bg-red-800" : "bg-blue-950"
        }`}
      >
        {isError ? "Oops, an error occured" : "Are you sure?"}
      </h1>
      <p className="p-3 text-xs">{text}</p>
      <section className="p-3 flex justify-end gap-2">
        {needsCancel && (
          <Button
            customStyle="font-bold border border-red-800 text-red-800 bg-white hover:text-white hover:bg-red-800"
            text={isError ? "OKAY" : "CANCEL"}
            onClick={() => dispatch(hide())}
          />
        )}
        {proceedHandler && (
          <Button
            customStyle="font-bold border border-red-800 text-red-800 bg-white hover:text-white hover:bg-red-800"
            text={proceed}
            onClick={proceedHandler}
          />
        )}
      </section>
    </Card>
  );
};

export default Information;
