import {
  Block,
  BlockTitle,
  Button,
  Icon,
  List,
  ListItem,
  PageContent,
} from "framework7-react";
import * as React from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useNavigate, useSearchParams } from "react-router-dom";

const drawerBleeding = 72;

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  title: string;
}
export default function SwipeableEdgeDrawer(props: Props) {
  const { open, setOpen } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const navigateTo = useNavigate();
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
    if(!newOpen){
      navigateTo(-1)
    }
  };

  React.useEffect(() => {
    if (open) {
      searchParams.set("files", "");
      setSearchParams(searchParams);
    } else {
      searchParams.delete("files");
      setSearchParams(searchParams, { replace: true });
    }
  }, [open]);

  React.useEffect(() => {
    const callback = () => {
      if (open) {
        setOpen(false);
      }
    };
    window.addEventListener("popstate", callback);
    return () => window.removeEventListener("popstate", callback);
  }, [open]);

  return (
    <>
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          },
        }}
      />
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={true}
      >
        <div className=" rounded-md">
          <Puller />
          <p className=" px-4 text-lg font-semibold">{props.title}</p>
        </div>
        <div className=" h-full overflow-auto">{props.children}</div>
      </SwipeableDrawer>
    </>
  );
}
