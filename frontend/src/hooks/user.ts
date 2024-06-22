import { useEffect, useState } from "react";
 
import { Preferences } from "@capacitor/preferences";

export function useUser() {
  const [user, setUser] = useState<User | undefined>();
  useEffect(() => {
    Preferences.get({ key: "user" }).then((_) =>
      setUser(JSON.parse(_.value as string))
    );
  }, []);
  return user as User;
}
