import { Fab, FabButton, FabButtons, Icon } from "framework7-react";
import { DOUBTS_ICON, RAISED_HAND_ICON, RESOURCES_ICON } from "../../utils/icons";
import useNoUI from "../../hooks/noUI";
import useUI from "../../hooks/ui";

export default () => {
  const ui = useUI();
  return (
    <Fab position="right-bottom" slot="fixed" className={!ui.fab ? 'hidden' : ''}>
      <Icon material={RAISED_HAND_ICON} />
      <Icon ios="f7:xmark" md="material:close" />
      <FabButtons position="top">
        <FabButton label="Ask Doubt">
          <Icon material={DOUBTS_ICON} />
        </FabButton>
        <FabButton label="Get Resource">
          <Icon material={RESOURCES_ICON} />
        </FabButton>
      </FabButtons>
    </Fab>
  );
};
