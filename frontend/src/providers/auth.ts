import { del, get, set, update } from "idb-keyval";
import { checkUserAndAssignToken } from "../apis/auth";
import { wait } from "../utils/functions";
import { Preferences } from "@capacitor/preferences";

export const authProvider: AuthProvider = {
  initial: true,
  isAuthenticated: false,
  userId: undefined,
  token: undefined,
  async signin(userId: string, password: string) {
    await wait(2000, null);
    const { res } = await checkUserAndAssignToken({
      userId,
      password,
    });
    authProvider.userId = userId;
    authProvider.isAuthenticated = true;
    authProvider.token = res?.token as string;
    await Preferences.set({
      key: "userId",
      value: userId,
    });
    await Preferences.set({
      key: "isAuthenticated",
      value: "true",
    });
    await Preferences.set({
      key: "token",
      value: res?.token as string,
    });
  },
  async signout() {
    authProvider.isAuthenticated = true;
    authProvider.userId = "";
    await Preferences.remove({ key: "userId" });
    await Preferences.remove({ key: "isAuthenticated" });
  },
  async init() {
    if (authProvider.initial) {
      const { value: userId } = await Preferences.get({ key: "userId" });
      const { value: token } = await Preferences.get({ key: "token" });
      authProvider.userId = userId as string;
      authProvider.initial = false;
      authProvider.token = token as string;
      if (userId && token) authProvider.isAuthenticated = true;
    }
  },
  async getUser() {
    await authProvider.init();
    return {
      userId: authProvider.userId,
      token: authProvider.token,
    };
  },
};
