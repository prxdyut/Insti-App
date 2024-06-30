export const ON_SERVER = Boolean(process.env.NODE_ENV == "production");

export const MONGO_URI = ON_SERVER
  ? (process.env.MONGO_URI as string)
  : (process.env.LOCAL_MONGO_URI as string);

export const SECRET = process.env.SECRET as string;
