type AssignmentsArguments = {
  userId: string;
  password: string;
}

type fetchAssignments = ApiRes<Assignment[]>;

// export async function fetchAssignments({
//   userId,
//   password,
// }: AssignmentsArguments): Promise<fetchAssignments> {

//   return {
//     res: [{
//         _id
//     }],
//     error: false,
//   };
// }
