import connectDB from "../config/db";

export default (dbCollection: string, model: any) => {
  return async (dbName: string) => {
    const db = await connectDB(dbName);
    const res = db.model(dbCollection, model);
    return res;
  };
};
