import React from "react";
import { matchRoutes } from "react-router-dom";
import { allRoutes } from "../utils/routes";

export default function useUI(): UI {
  const matchingPath =
    matchRoutes(allRoutes, location)?.map(({ route }) => route.path)[0] || "/";

  const { ui } = allRoutes.find((route) => route.path == matchingPath) ||
    (matchingPath == "/" && allRoutes.find((route) => route.index)) || {
      ui: true,
    };

  if (ui === null) {
    return {
      topBar: true,
      bottomBar: true,
      fab: true,
      backBar: false,
    };
  } else if (typeof ui === "boolean") {
    return {
      topBar: ui,
      bottomBar: ui,
      fab: ui,
      backBar: false,
    };
  } else {
    return {
      topBar: true,
      bottomBar: true,
      fab: true,
      backBar: false,
      ...(ui as UI),
    };
  }
}
