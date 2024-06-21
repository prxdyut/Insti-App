import { Link, NavLeft, NavRight, NavTitle, Navbar } from "framework7-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useUI from "../../hooks/ui";

export default function BackBarTop() {
  const navigateTo = useNavigate();
  const clickBack = () => navigateTo(-1);
  const ui = useUI();
  const params = useParams();

  return (
    <Navbar className={!ui.backBar ? "hide" : ""}>
      <NavLeft backLink="Back" onClickBack={clickBack} />
      <NavTitle>{ui.heading?.replaceAll("{id}", params?.id || "")}</NavTitle>
      <NavRight>
        <Link iconF7="ellipsis_vertical" panelOpen="right" iconSize={24}></Link>
      </NavRight>
    </Navbar>
  );
}
