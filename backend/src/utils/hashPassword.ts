export default (unencryptedPassword: string) =>
  Bun.password.hash(unencryptedPassword, {
    algorithm: "bcrypt",
  });
