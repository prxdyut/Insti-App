import { ProfileTab } from '../../components/Profile/InfoTab';
import { FilesTab } from '../../components/Profile/FilesTab';
import { BadgesTab } from "../../components/Profile/BadgeTab";
import {
  IconButton,
  Popover,
  Typography,
  Button as MuiButton,
} from "@mui/material";
import {
  Block,
  BlockTitle,
  Button,
  Icon,
  Link,
  List,
  ListInput,
  ListItem,
  Page,
  Tab,
  Tabs,
  Toolbar,
  f7,
} from "framework7-react";
import { ListInputProps } from "framework7-react/components/list-input";
import ResourcesList from "../Resources/Home";
import React from "react";
import { useLoaderData } from "react-router-dom";

export default function ProfileSection() {
  const data = useLoaderData() as {
    info: ProfileInfo;
    badges: ProfileBadge[];
    files: ProfileFile[];
  };

  return (
    <Page>
      {/* <BlockTitle>Profile</BlockTitle> */}
      <Block className="no-padding">
        <center>
          <div className=" relative h-44">
            <img
              className=" h-40 mt-8 mb-2"
              src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
            />
            <Button
              href="#"
              className=" w-fit flex gap-1 absolute"
              tonal
              style={{ top: "-2.5rem", right: "-2.5rem" }}
            >
              <Icon material="edit" size={16} />
              Edit
            </Button>
          </div>
        </center>
      </Block>
      <Block className="">
        <Toolbar className=" rounded-lg mx-8">
          <Link tabLink="#tab-1" tabLinkActive>
            Profile
          </Link>
          <Link tabLink="#tab-2">Files</Link>
          {/* <Link tabLink="#tab-3">Badges</Link> */}
        </Toolbar>
      </Block>

      <Tabs>
        <ProfileTab {...data} />
        <FilesTab {...data} />
        {/* <BadgesTab {...data} /> */}
      </Tabs>
    </Page>
  );
}