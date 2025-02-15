type User = {
  userId: string;
  firstName: string;
  lastName: string;
  role: "admin" | "student" | "tutor";
  token: string;
  access?: string[]
};

type AuthProvider = {
  initial: boolean;
  isAuthenticated: boolean;
  user: User | {};
  signin(email: string, password: string): Promise<void>;
  signout(): Promise<any>;
  init(): Promise<void>;
  getUser(args: import("react-router-dom").LoaderFunctionArgs): Promise<User>;
  checkAuth(args: import("react-router-dom").LoaderFunctionArgs): Promise<any>;
};
