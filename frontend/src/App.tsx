import { RouterProvider, useLocation } from "react-router-dom";
import routes from "./utils/routes";
import { App, View } from "framework7-react";
import "framework7/css/bundle";
import "framework7-icons";
import { AppProps } from "framework7-react/components/app";
import useNativeBackSync from "./hooks/nativeBackSync";
import { PageTransition } from "@steveeeie/react-page-transition";

export default () => {
  const f7params: AppProps = {
    name: "My App",
    theme: "md",
  };

  return (
    <App {...f7params}>
      <View main>
          <RouterProvider router={routes} />
      </View>
    </App>
  );
};
