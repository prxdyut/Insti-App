import {
  Block,
  BlockTitle,
  Icon,
  List,
  ListItem,
  Page,
  Toggle,
} from "framework7-react";
import React from "react";

export default function SettingsHome() {
  return (
    <Page>
      {/* <BlockTitle>Settings</BlockTitle> */}
      <Block className=" no-padding">
        <List dividersIos outlineIos strongIos>
          <ListItem title="Notifications">
            <Icon slot="media" material="notifications" />
            <Toggle slot="after" />
          </ListItem>
          <li>
            <ul>
              <ListItem title="SMS">
                <Toggle slot="after" />
              </ListItem>
              <ListItem title="Email">
                <Toggle slot="after" />
              </ListItem>
              <ListItem title="Whatsapp">
                <Toggle slot="after" />
              </ListItem>
            </ul>
          </li>
        </List>
      </Block>
    </Page>
  );
}
