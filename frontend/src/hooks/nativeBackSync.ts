import { App } from "@capacitor/app";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function useNativeBackSync() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    function addListeners() {
      App.addListener("backButton", ({ canGoBack }) => {
        if (canGoBack) {
          navigate(-1);
        } else {
          App.exitApp();
        }
      });
    }

    function removeListeners() {
      App.removeAllListeners();
    }

    addListeners();

    return () => {
      removeListeners();
    };
  }, [location]);
}
