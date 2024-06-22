import { user1, user2 } from "../data/users";
 

export async function checkUserAndAssignToken({
  userId,
  password,
}: {
  userId: string;
  password: string;
}): Promise<User> {
  if (userId == "student" && password == "student") return user2;
  if (userId == "tutor" && password == "tutor") return user1;
  throw "Invalid Credentials";
}

export async function verifyToken(user: User) {
  // token verification logic
  if (user?.token) return true;
  return false;
}
