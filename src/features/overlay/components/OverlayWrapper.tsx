import { ReactNode } from "react";

const OverlayWrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
    {children}
  </div>
);

export default OverlayWrapper;
