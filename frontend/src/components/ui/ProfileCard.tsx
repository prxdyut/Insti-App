import {
  Avatar,
  Box,
  Card,
  CardHeader,
  CardMedia,
  IconButton,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React, { FC, ReactNode } from "react";

type ProfileCardProps = {
  avatar: {
    src?: string;
    initial: string;
  };
  action: {
    icon: ReactNode;
    cb: () => void;
  };
  title: string;
  subtitle?: string;
  media?: string;
};

export function ProfileCard(props: ProfileCardProps) {
  return (
    <>
      <Card elevation={0}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="avatar"
              src={props.avatar.src}
            >
              {props.avatar.initial}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" onClick={props.action.cb}>
              {props.action.icon}
            </IconButton>
          }
          title={props.title}
          subheader={props.subtitle}
        />
        <CardMedia
          component="img"
          sx={{
            borderRadius: 2,
            width: "calc( 100% - 32px)",
            mx: 2,
            aspectRatio: "16/9",
          }}
          image={props.media}
          alt="Account"
        />
      </Card>
    </>
  );
}
