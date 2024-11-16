import { ENV } from "@/lib/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./src/database/schema.ts",
    dialect: "postgresql",
    dbCredentials: {
        url: ENV.DATABASE_URL as string,
    },
    verbose: true,
    strict: true,
});
