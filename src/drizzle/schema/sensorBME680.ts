import { pgTable, uuid, numeric, timestamp } from "drizzle-orm/pg-core";

export const sensorBME680 = pgTable("sensor_bme680", {
    id: uuid("id").primaryKey().defaultRandom(),
    temperature: numeric("temperature").notNull(),
    humidity: numeric("humidity").notNull(),
    pressure: numeric("pressure").notNull(),
    airQuality: numeric("air_quality").notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
});
