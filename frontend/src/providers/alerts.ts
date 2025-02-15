import { del, get, set, update } from "idb-keyval";
import subjects from "../utils/subjects";
import fetchBackend from "../utils/fetchBackend";

export const alertsProvider: Provider<{ alerts: Alert[] }> = {
  data: { alerts: [] },
  initial: true,
  async load() {
    const res = await fetchBackend("/alerts", "GET");

    const data: { alerts: Alert[] } = {
      alerts: [],
    };

    alertsProvider.initial = false;
    alertsProvider.data = data;
  },
};
