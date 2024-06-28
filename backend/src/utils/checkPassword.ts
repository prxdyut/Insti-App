export default (unencryptedPassword: string, encryptedPassword: string) =>
  Bun.password.verify(unencryptedPassword, encryptedPassword, "bcrypt");
