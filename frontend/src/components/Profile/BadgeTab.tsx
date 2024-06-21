
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
import React from "react";
import { useLoaderData } from "react-router-dom";
export function BadgesTab({
  badges
}: {
  badges: ProfileBadge[];
}) {
  return <Tab id="tab-3">
      <Block className="">
        <div className=" grid grid-cols-4 gap-4">
          {badges.map((_, i) => <div key={i} className=" bg-gray-200 p-4 rounded-full" onClick={() => {
          f7.dialog.alert(`${_.description} <br/> <p class="text-xs opacity-75">${_.date}</p>`, _.title);
        }}>
              <img src={`/badges/${_.id}.png`} />
            </div>)}
        </div>
      </Block>
    </Tab>;
}
  