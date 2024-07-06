import { Block, List, ListItem } from "framework7-react";
import { useNavigate } from "react-router-dom";
import subjects from "../../utils/subjects";
import { SCORES_SLUG } from "../../utils/slugs";

export default function ScoresList({ scores }: { scores: Score[] }) {
  const navigateTo = useNavigate()

  return (
    <Block className=" no-padding">
      <List dividersIos outlineIos strongIos>
        {scores.map(({ subject, title, marks, date, uid }, i) => (
          <ListItem
          className=" capitalize"
            key={i}
            link={`/${SCORES_SLUG}/${uid}`}
            header={subjects()[subject]}
            title={title}
            after={`${marks.obtained} / ${marks.total}`}
            footer={`${date.toDateString()}`}
            onClick={()=> navigateTo(`/${SCORES_SLUG}/${uid}`)}
          />
        ))}
      </List>
    </Block>
  );
}
