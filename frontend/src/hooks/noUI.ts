import React from "react";
import { matchRoutes } from "react-router-dom";
import { allRoutes } from "../utils/routes";

export default function useNoUI() {
  const matchingPath =
    matchRoutes(allRoutes, location)?.map(({ route }) => route.path)[0] || "/";

  const showUI = allRoutes.find((route) => route.path == matchingPath)?.[
    "noUI"
  ];

  return showUI
}
