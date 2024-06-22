import { redirect } from "react-router-dom";
import { authProvider } from "../providers/auth";

export async function signoutLoader() {
  return await authProvider.signout();
}
