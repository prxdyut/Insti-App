import { useLocalStorage } from "@mantine/hooks";

export function useLocalData() {
  const [value, setValue] = useLocalStorage<any>({
    key: "local-data",
    defaultValue: {},
  });

  return { localData: value, setLocalData: setValue };
}
