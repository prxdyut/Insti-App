import { Page } from "framework7-react";
import { useLoaderData } from "react-router-dom";
import AlertsList from "../../components/Alerts/List";

export default function AlertsHome() {
  const data = useLoaderData() as { alerts: Alert[] };
  
  return (
    <Page>
      {/* <BlockTitle>Alerts</BlockTitle> */}
      <AlertsList {...data} />
    </Page>
  );
}
