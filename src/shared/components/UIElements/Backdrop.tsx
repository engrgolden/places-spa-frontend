import { useDispatch } from "react-redux";
import { hide } from "../../../features/overlay/overlaysSlice";
import { ReactNode } from "react";

const Backdrop: React.FC<{ children: ReactNode; closeable?: boolean }> = ({
  children,
  closeable = true,
}) => {
  const dispatch = useDispatch();
  const closeOverlayHandler = () => {
    dispatch(hide());
  };

  return (
    <section
      className="fixed inset-0 z-10 bg-black bg-opacity-50"
      onClick={closeable ? closeOverlayHandler : undefined}
    >
      {children}
    </section>
  );
};

export default Backdrop;
