import { redirect } from "react-router-dom";
import { authProvider } from "../providers/auth";

export async function protectedLoader() {
  //   if (authProvider.isAuthenticated) {
  //     return redirect("/");
  //   }

  return null;
}
