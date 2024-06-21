import { useNavigation } from "react-router-dom";

export default function useFormLoadingState(...args: string[]) {
  let navigation = useNavigation();
  const check = (name: string) => navigation.formData?.get(name) != null
  return args.every(check);
}