import { del, get, set, update } from "idb-keyval";
import { checkUserAndAssignToken, verifyToken } from "../apis/auth";
import { wait } from "../utils/functions";
import { Preferences } from "@capacitor/preferences";
import {
  LoaderFunctionArgs,
  matchPath,
  matchRoutes,
  redirect,
} from "react-router-dom";
import { allRoutes } from "../utils/routes";
import fetchBackend from "../utils/fetchBackend";

export const authProvider: AuthProvider = {
  initial: true,
  isAuthenticated: false,
  user: {},
  async signin(email: string, password: string) {
    const formData = new FormData();
    formData.set("email", email);
    formData.set("unencryptedPassword", password);

    const user = await fetchBackend("/users/login", "POST", formData, true);

    if (user.userId) {
      authProvider.isAuthenticated = true;
      authProvider.user = user;
      authProvider.initial = false;
      await Preferences.set({
        key: "user",
        value: JSON.stringify(user),
      });
      await Preferences.set({
        key: "isAuthenticated",
        value: "true",
      });
    }
  },
  async signout() {
    authProvider.isAuthenticated = false;
    authProvider.user = {};
    await Preferences.remove({ key: "user" });
    await Preferences.remove({ key: "isAuthenticated" });
    return redirect("/login");
  },
  async init() {
    if (authProvider.initial) {
      const { value: userStr } = await Preferences.get({ key: "user" });
      const user = JSON.parse(userStr as string);
      authProvider.user = user;
      authProvider.isAuthenticated = true;
      authProvider.initial = false;
    }
  },
  async getUser(args: LoaderFunctionArgs): Promise<User> {
    await authProvider.init();
    return authProvider.user as User;
  },
  async checkAuth(args: LoaderFunctionArgs): Promise<any> {
    await authProvider.init();

    if (!authProvider.isAuthenticated) throw "unauthorised-access";

    const location = new URL(args.request.url);
    // @ts-ignore
    const access = matchRoutes(allRoutes, location.pathname)[0]?.route.access;
    const role = (authProvider.user as User).role;
    const isAppropriate = access?.includes(role);
    if (!isAppropriate) throw "no-access";
  },
};
