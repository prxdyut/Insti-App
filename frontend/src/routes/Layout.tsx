import { Outlet } from "react-router-dom";
import useNativeBackSync from "../hooks/nativeBackSync";
import TopBar from "../components/Appbar/TopBar";
import SideDrawer from "../components/Appbar/Drawer";
import FABButton from "../components/FAB/Button";
import BottomBar from "../components/bottomBar/Bottom";
import BackBarTop from "../components/backBar/top";
import React from "react";
import Images from "./Images";

export default function Layout() {
  useNativeBackSync();

  return (
    <React.Fragment>
      <TopBar />
      <BackBarTop />
      <SideDrawer />
      {/* <FABButton /> */}
      <BottomBar />
      <Outlet />
    </React.Fragment>
  );
}
