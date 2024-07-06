import React from "react";
import { useUser } from "../../hooks/user";
import { useLocalData } from "../../hooks/localData";
import { List, ListInput } from "framework7-react";

export default function ClassSelector() {
  const user = useUser();
  const { localData, setLocalData } = useLocalData();
  const authRoles = user?.role == "admin" || user?.role == "tutor";

  const classes = [
    { label: "Class 1", value: 342543 },
    { label: "Class 2", value: 567890 },
    { label: "Class 3", value: 123456 },
    { label: "Class 4", value: 789012 },
    { label: "Class 5", value: 345678 },
  ];

  if (!localData?.class) {
    setLocalData((__: any) => ({ ...__, class: classes[0].value }));
  }

  return authRoles ? (
    <List style={{ margin: 0, paddingBlock: 8 }}>
      <ListInput
        type="select"
        value={localData?.class}
        onChange={(_) =>
          setLocalData((__:any) => ({ ...__, class: _.target.value }))
        }
        outline
      >
        {classes.map((class_) => (
          <option value={class_.value} key={class_.value}>
            {class_.label}
          </option>
        ))}
      </ListInput>
    </List>
  ) : null;
}
