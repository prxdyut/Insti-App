import { Link, Toolbar } from "framework7-react";
import { useState } from "react";
import useNoUI from "../../hooks/noUI";
import useUI from "../../hooks/ui";
import {
  ALERTS_ICON,
  ASSIGNMENTS_ICON,
  DOUBTS_ICON,
  SCHEDULE_ICON,
} from "../../utils/icons";
import {
  ALERT_SLUG,
  ASSIGNMENT_SLUG,
  DOUBTS_SLUG,
  SCHEDULE_SLUG,
} from "../../utils/slugs";
import {
  matchPath,
  matchRoutes,
  useLocation,
  useNavigate,
} from "react-router-dom";

type Tab = {
  label: string;
  icon: string;
  url: string;
};

export default () => {
  const location = useLocation();
  const value = () => {
    if (matchPath("/" + ALERT_SLUG, location.pathname)) return 1;
    if (matchPath("/" + SCHEDULE_SLUG, location.pathname)) return 2;
    if (matchPath("/" + ASSIGNMENT_SLUG, location.pathname)) return 3;
    if (matchPath("/" + DOUBTS_SLUG, location.pathname)) return 4;
    return false;
  };

  const contents: Tab[] = [
    {
      label: "Alerts",
      icon: ALERTS_ICON,
      url: ALERT_SLUG,
    },
    {
      label: "Schedule",
      icon: SCHEDULE_ICON,
      url: SCHEDULE_SLUG,
    },
    {
      label: "Assignments",
      icon: ASSIGNMENTS_ICON,
      url: ASSIGNMENT_SLUG,
    },
    {
      label: "Doubts",
      icon: DOUBTS_ICON,
      url: DOUBTS_SLUG,
    },
  ];

  const ui = useUI();
  const navigate = useNavigate();
  return (
    <Toolbar
      tabbar
      icons
      bottom
      className={`bottombar ${!ui.bottomBar ? "hide" : ""}`}
    >
      {contents.map((content, i) => (
        <Link
          key={i}
          tabLink
          onClick={() => navigate(content.url)}
          tabLinkActive={i + 1 == value()}
          text={content.label}
          iconMaterial={`${content.icon}`}
        />
      ))}
    </Toolbar>
  );
};
