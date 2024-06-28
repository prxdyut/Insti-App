import * as mongoose from "mongoose";
import { MONGO_URI } from "../variables";

const dbCache: Map<string, mongoose.Connection> = new Map();

const getDB = async (conn: mongoose.Connection, dbName: string) => {
  if (!dbCache.has(dbName)) {
    dbCache.set(dbName, conn.useDb(dbName, { useCache: true }));
  }

  return dbCache.get(dbName) as mongoose.Connection;
};

const connectDB = async (dbName: string) => {
  try {
    const conn = await mongoose.createConnection(MONGO_URI).asPromise();
    return getDB(conn, dbName);
  } catch (err: any) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
