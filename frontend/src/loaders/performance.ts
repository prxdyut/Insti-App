import { authProvider } from "../providers/auth";
import { performanceProvider } from "../providers/performance";

export const performanceHome = async () => {
  await performanceProvider.load({});

  return {
    user: authProvider.getUser(),
    ...performanceProvider.data,
  };
};
