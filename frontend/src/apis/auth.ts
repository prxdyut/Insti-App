interface AuthenticateArguments {
  userId: string;
  password: string;
}

type checkUserAndAssignToken = ApiRes<UserRef>;

export async function checkUserAndAssignToken({
  userId,
  password,
}: AuthenticateArguments): Promise<checkUserAndAssignToken> {
  // check if credentials match
  
  return {
    res: {
      userId: "pradyut",
      token: "kbsOFzGrCeiw4yNPjNO1HmseTjlRK/lTM/z3N4NeN7o=",
    },
    error: false,
  };
}
