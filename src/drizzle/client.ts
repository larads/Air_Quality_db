import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { env } from "../env";
import { sensorBME680 } from "./schema/sensorBME680";

export const pg = postgres(env.POSTGRES_URL)
export const db = drizzle(pg, {
    schema: {
        sensorBME680
    }
});