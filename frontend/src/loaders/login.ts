import { redirect } from "react-router-dom";
import { authProvider } from "../providers/auth";

export async function loginLoader() {
  // if (authProvider.isAuthenticated) {
  //   return redirect("/");
  // }
  return null;
}
