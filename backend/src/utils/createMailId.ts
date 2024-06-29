export default async (username: string, fullName: string, password: string) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-API-Key", Bun.env.MAILCOW_API_KEY as string);

  const raw = JSON.stringify({
    active: "1",
    domain: "pradyutdas.online",
    local_part: username,
    name: fullName,
    password: password,
    password2: password,
    quota: "50",
    force_pw_update: "1",
    tls_enforce_in: "1",
    tls_enforce_out: "1",
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  return await fetch(
    "https://mail.pradyutdas.online/api/v1/add/mailbox",
    requestOptions
  ).then((response) => response.json());
};
