import { Page } from "framework7-react";
import { useLoaderData } from "react-router-dom";
import AlertsList from "../../components/Alerts/List";
import ConditionalButton from "../../components/Admin/Button";

export default function AlertsHome() {
  const data = useLoaderData() as { alerts: Alert[], user: User };
  
  return (
    <Page>
      <ConditionalButton
        user={data.user}
        className="px-4 flex justify-end mt-2 -mb-5"
        label="New Alert"
        navigate="./new"
      />
      <AlertsList {...data} />
    </Page>
  );
}
