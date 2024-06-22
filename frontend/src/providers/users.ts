import { del, get, set, update } from "idb-keyval";
import subjects from "../utils/subjects";
 
import { user1, user2 } from "../data/users";

export const usersProvider: Provider<{ users: User[] }> = {
  data: { users: [] },
  initial: true,
  async load() {
    const data :{ users: User[] }= {
      users: [user1, user2]     
    };

    usersProvider.initial = false;
    usersProvider.data = data;
  },
};
