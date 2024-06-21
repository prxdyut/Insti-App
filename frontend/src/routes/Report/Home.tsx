import {
  Block,
  BlockTitle,
  Button,
  Icon,
  List,
  ListButton,
  ListInput,
  Page,
} from "framework7-react";
import React from "react";

export default function ReportSection() {
  return (
    <Page>
      {/* <BlockTitle>Report</BlockTitle> */}
      <Block className="no-padding">
        <div className=" mx-4">
          We value your feedback and are committed to resolving any issues you
          may encounter. Please provide as much detail as possible so we can
          address your concerns promptly.
        </div>
        <List>
          <ListInput label="Message" type="textarea"></ListInput>
          <div className=" mx-4 flex justify-end">
            <Button tonal outline className=" w-fit">
              Send
            </Button>
          </div>
        </List>
      </Block>
    </Page>
  );
}
