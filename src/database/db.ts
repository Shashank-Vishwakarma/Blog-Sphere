import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";
import { ENV } from "@/lib/env";

const sql = neon(ENV.DATABASE_URL as string);
export const db = drizzle({ client: sql, schema: schema });
