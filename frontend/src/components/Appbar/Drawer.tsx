import { Box, Divider, SwipeableDrawer } from "@mui/material";
import topBarStore from "../../stores/topBar";
import React, { useState } from "react";
import {
  Page,
  Navbar,
  Block,
  List,
  ListItem,
  Icon,
  Link,
  Button,
} from "framework7-react";
import { ProfileCard } from "../ui/ProfileCard";
import {
  ASSIGNMENT_SLUG,
  ALERT_SLUG,
  SCHEDULE_SLUG,
  TEST_SLUG,
  SCORES_SLUG,
  DOUBTS_SLUG,
  RESPONSES_SLUG,
  ATTENDANCE_SLUG,
  ACCOUNT_SLUG,
  SETTINGS_SLUG,
  REPORT_SLUG,
  CONTACT_SLUG,
  LOGIN_SLUG,
  RESET_SLUG,
  PERFORMANCE_SLUG,
  RESOURCES_SLUG,
} from "../../utils/slugs";
import {
  ACCOUNT_ICON,
  ALERTS_ICON,
  ASSIGNMENTS_ICON,
  ATTENDANCE_ICON,
  CONTACT_ICON,
  DOUBTS_ICON,
  PERFORMANCE_ICON,
  REPORT_ICON,
  RESOURCES_ICON,
  SCHEDULE_ICON,
  SETTINGS_ICON,
  TESTS_ICON,
} from "../../utils/icons";
import { useNavigate } from "react-router-dom";

type Contents = {
  label: string;
  href: string;
  icon?: string;
};

export default () => {
  const topContents: Contents[] = [
    {
      label: "Alerts",
      href: `/${ALERT_SLUG}`,
      icon: ALERTS_ICON,
    },
    {
      label: "Assignments",
      href: `/${ASSIGNMENT_SLUG}`,
      icon: ASSIGNMENTS_ICON,
    },
    {
      label: "Schedule",
      href: `/${SCHEDULE_SLUG}`,
      icon: SCHEDULE_ICON,
    },
    {
      label: "Scores",
      href: `/${SCORES_SLUG}`,
      icon: TESTS_ICON,
    },
    {
      label: "Doubts",
      href: `/${DOUBTS_SLUG}`,
      icon: DOUBTS_ICON,
    },
    {
      label: "Attendance",
      href: `/${ATTENDANCE_SLUG}`,
      icon: ATTENDANCE_ICON,
    },
    {
      label: "Performance",
      href: `/${PERFORMANCE_SLUG}`,
      icon: PERFORMANCE_ICON,
    },
    {
      label: "Resources",
      href: `/${RESOURCES_SLUG}`,
      icon: RESOURCES_ICON,
    },
  ];

  const bottomContents: Contents[] = [
    {
      label: "Account",
      href: `/${ACCOUNT_SLUG}`,
      icon: ACCOUNT_ICON,
    },
    {
      label: "Settings",
      href: `/${SETTINGS_SLUG}`,
      icon: SETTINGS_ICON,
    },
    {
      label: "Report",
      href: `/${REPORT_SLUG}`,
      icon: REPORT_ICON,
    },
  ];

  const navigateTo = useNavigate();

  const drawerState = topBarStore((state) => state.isOpen);
  const openDrawer = topBarStore((state) => state.open);
  const closeDrawer = topBarStore((state) => state.close);

  const navigate = (href: string) => {
    closeDrawer()
    navigateTo(href);
  }

  const ProfileCardProps = {
    avatar: {
      initial: "P",
    },
    action: {
      cb() {
        alert("Clicked");
      },
      icon: <Link iconF7="ellipsis_vertical" iconSize={20} />,
    },
    title: "Pradyut",
    subtitle: "Student",
    media: "https://picsum.photos/900/1600",
  };
  
  return (
    <SwipeableDrawer
      anchor={"left"}
      open={drawerState}
      onClose={closeDrawer}
      onOpen={openDrawer}
    >
      <div
        style={{
          width: "75vw",
          height: "100vh",
          display: "flex",
          flexFlow: "column",
        }}
      >
        <ProfileCard {...ProfileCardProps} />
        <div style={{ flex: 1, overflow: "scroll" }}>
          <List strongIos>
            {topContents.map((content, i) => (
              <React.Fragment key={i}>
                <ListItem
                  title={content.label}
                  link={content.href}
                  onClick={() => navigate(content.href)}
                  style={{ listStyle: "none" }}
                >
                  <Icon slot="media" material={content.icon} />
                </ListItem>
              </React.Fragment>
            ))}
            <ListItem
              style={{
                height: 0,
                margin: 0,
                flexShrink: 0,
                borderWidth: 0,
                borderStyle: "solid",
                borderColor: "rgba(0, 0, 0, 0.12)",
                borderBottomWidth: "thin",
                paddingTop: 8,
                listStyle: "none",
              }}
            />
            {bottomContents.map((content, i) => (
              <React.Fragment key={i}>
                <ListItem
                  style={{ listStyle: "none" }}
                  title={content.label}
                  link={content.href}
                  onClick={() => navigate(content.href)}
                >
                <Icon slot="media" material={content.icon} />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </div>
        <Button
          color="red"
          style={{ padding: "1.6rem" }}
          onClick={() => navigateTo("/login")}
        >
          Log Out
        </Button>
      </div>
    </SwipeableDrawer>
  );
};
