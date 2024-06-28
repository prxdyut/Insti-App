export const MONGO_URI =
  process.env.NODE_ENV == "production"
    ? (process.env.MONGO_URI as string)
    : (process.env.LOCAL_MONGO_URI as string);

export const SECRET =
  process.env.NODE_ENV == "production"
    ? (process.env.SECRET as string)
    : (process.env.LOCAL_SECRET as string);
