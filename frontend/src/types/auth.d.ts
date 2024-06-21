type User = {
  userId: string ;
  firstName: string;
  lastName:string;
  phoneNumber: string;
  meta: {
    [key: string]: string
  };
  token: string;
}

type AuthProvider = {
  initial: boolean;
  isAuthenticated: boolean;
  userId?: User["userId"];
  token?: User["token"];
  signin(userId: string, password: string): Promise<void>;
  signout(): Promise<void>;
  init(): Promise<void>;
  getUser(): Promise<UserRef>;
}
