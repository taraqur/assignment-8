import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri && process.env.NODE_ENV === "production" && typeof window === "undefined") {
  console.warn("MONGODB_URI is not defined in production environment. Database operations will fail.");
}

const client = uri ? new MongoClient(uri) : null as any;
const db = client ? client.db() : null as any;

export { client, db };
