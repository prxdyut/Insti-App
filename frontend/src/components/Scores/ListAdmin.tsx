import { Block, Button, List, ListItem } from "framework7-react";
import { useNavigate } from "react-router-dom";
import subjects from "../../utils/subjects";
import { SCORES_SLUG } from "../../utils/slugs";
import ConditionalButton from "../Admin/Button";

export default function ScoresListAdmin({
  allScores
}: {
  allScores: AllScore[];
  scores: Score[];
  user: User;
}) {
  const navigateTo = useNavigate();

  return (
    <Block className=" no-padding">
      <div className="px-4 flex justify-end -mb-5 mt-2">
        <Button fill onClick={() => navigateTo("./new")}>
          New Scores
        </Button>
      </div>
      <List dividersIos outlineIos strongIos>
        {allScores.map(({ subject, title, obtained, date, uid }, i) => (
          <ListItem
            className=" capitalize"
            key={i}
            link={`/${SCORES_SLUG}/${uid}`}
            header={subjects()[subject]}
            title={title}
            after={`${obtained.length}`}
            footer={`${date.toDateString()}`}
            onClick={() => navigateTo(`/${SCORES_SLUG}/${uid}`)}
          />
        ))}
      </List>
    </Block>
  );
}
