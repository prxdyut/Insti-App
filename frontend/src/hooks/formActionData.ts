import { useActionData } from "react-router-dom";

export default function useFormActionData<R>():
  | ActionRes<R>
  | undefined {
  return useActionData() as ActionRes<R> | undefined;
}
