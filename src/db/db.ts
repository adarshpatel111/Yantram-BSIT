import { DATABASE_URL } from "@/utilities/contants";
import { MongoClient } from "mongodb";

const uri = DATABASE_URL;
const client = new MongoClient(uri);
await client.connect();
export const db = client.db();
