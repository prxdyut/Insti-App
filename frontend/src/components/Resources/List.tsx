import { Block, Icon, List, ListItem } from "framework7-react";
import { useNavigate } from "react-router-dom";

export function ResourcesList({ files, user }: { files: _File[]; user: User }) {
  const navigateTo = useNavigate();
  const isStudent = user.role == "student";

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
            onClick={() =>
              isStudent
                ? navigateTo(`./${data._id}`)
                : navigateTo(`./${data._id}/edit`)
            }
          >
            <Icon slot="media" material={data.icon} />
          </ListItem>
        ))}
      </List>
    </Block>
  );
}
