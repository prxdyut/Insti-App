import { Block, Icon, List, ListItem } from "framework7-react";

export function ResourcesList({ files }: { files: _File[] }) {
  return (
    <Block className=" no-padding">
      <List dividersIos mediaList outlineIos strongIos className="">
        {files.map((data, i) => (
          <ListItem
            key={i}
            link="#"
            footer={`${data.by.firstName} ${data.by.firstName}`}
            header={data.name}
            title={data.title}
            after={data.size}
          >
            <Icon slot="media" material={data.icon} />
          </ListItem>
        ))}
      </List>
    </Block>
  );
}
