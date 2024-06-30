export default (password: string, email: string) => {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  myHeaders.append("X-API-Key", Bun.env.MAILCOW_API_KEY as string);
  myHeaders.append("Content-Type", "application/json");

  const obj = {
    attr: {
      active: "1",
      password: password,
      password2: password,
      sogo_access: "1"
    },
    items: [email],
  };

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(obj),
  };

  return fetch(
    `https://mail.${Bun.env.MAIL_DOMAIN}/api/v1/edit/mailbox`,
    requestOptions
  ).then((response) => response.json());
};
