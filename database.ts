import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

export const port = process.env.PORT || 3000
export const client = new MongoClient(process.env.MONGO_URI!);

async function exit() {
    try {
        await client.close();
        console.log("Disconnected from database")
    } catch (error) {
        console.error(error)
    }

    process.exit(0);
}

export async function connect() {
    try {
        await client.connect();
        console.log("Connected to database")
        process.on("SIGINT", exit);
    } catch (error) {
        console.error(error)
    }
}