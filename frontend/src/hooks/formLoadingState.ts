import { useNavigation } from "react-router-dom";

export default function useFormLoadingState(...args: string[]) {
  let navigation = useNavigation();
  return navigation.formData != undefined
}