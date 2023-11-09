import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ACCESS_VIEW } from "../../utils/constants";
import RegisterPage from "./RegisterPage/RegisterPage";
import LoginPage from "./LoginPage/LoginPage";

const AccessMain = () => {
  const view = useSelector((state) => state.access);

  useEffect(() => {
    // Prevent scrolling on mount
    document.body.style.overflow = "hidden";

    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div>
      {view === ACCESS_VIEW.LOGIN && <LoginPage />}
      {view === ACCESS_VIEW.REGISTER && <RegisterPage />}
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          width: "100%",
          left: "50%",
          top: "50%",
          height: "auto",
          objectFit: "cover",
          transform: "translate(-70%, -50%) scale(4.5)",
          zIndex: "-1",
        }}
      >
        <source src="videos/nonokasweets.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default AccessMain;
