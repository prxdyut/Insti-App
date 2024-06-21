import {
  Link,
  NavLeft,
  NavRight,
  NavTitle,
  Navbar,
  Searchbar,
} from "framework7-react";
import topBarStore from "../../stores/topBar";
import useNoUI from "../../hooks/noUI";
import useUI from "../../hooks/ui";
import { useParams } from "react-router-dom";

export default function TopBar() {
  const openDrawer = topBarStore((state) => state.open);
  const ui = useUI();
  const params = useParams();

  return (
    <Navbar sliding={false} className={!ui.topBar ? "hide" : ""}>
      <NavLeft>
        <Link onClick={openDrawer} iconIos="f7:menu" iconMd="material:menu" />
      </NavLeft>
      <NavTitle sliding>
        {ui.heading}
      </NavTitle>
      <NavRight>
        <Link
          searchbarEnable=".searchbar-components"
          iconIos="f7:search"
          iconMd="material:search"
        />
      </NavRight>
      <Searchbar
        className="searchbar-components"
        searchContainer=".components-list"
        searchIn="a"
        expandable
      />
    </Navbar>
  );
}
