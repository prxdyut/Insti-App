import { authProvider } from "../providers/auth";

const API_URL = "http://localhost:3000/api";

export default async (
  url: string,
  type: "GET" | "POST",
  body?: FormData,
  withoutAuth?: Boolean
) => {
  const myHeaders = new Headers();
  const user = authProvider.user as User;
  if (!withoutAuth) myHeaders.append("Authorization", "Bearer " + user.token);

  const requestOptions =
    type == "GET"
      ? {
          method: type,
          headers: myHeaders,
        }
      : {
          method: type,
          headers: myHeaders,
          body,
        };

  const response = await fetch(API_URL + url, requestOptions);
  if (response.status == 400) {
    throw await response.text();
  }

  if (response.status == 401) {
    throw "Please Sign in first."
  }

  const jsonResponse = await response.json();

  if (jsonResponse?.success != undefined && jsonResponse.success == false)
    throw jsonResponse.error.issues
      .map((issue: any) => issue.message)
      .join(", ");

  return jsonResponse;
};
