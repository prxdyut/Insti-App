import { useEffect, useState } from "react";
import { Preferences } from "@capacitor/preferences";

export function useUser() {
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (user) clearInterval(intervalId);
      else
        Preferences.get({ key: "user" }).then((_) =>
          setUser(JSON.parse(_.value as string))
        );
    }, 1);

    return () => clearInterval(intervalId);
  }, [user]);
  return user as User;
}
