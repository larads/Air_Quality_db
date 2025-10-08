import type { Config } from "drizzle-kit"
import { env } from "./src/env";

export default {
    schema: "./src/drizzle/schema/*",
    out: "./drizzle/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: env.SUPABASE_URL,
    },
} satisfies Config