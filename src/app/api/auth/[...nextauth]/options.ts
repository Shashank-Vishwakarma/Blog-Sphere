import { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/database/db";
import { ENV } from "@/lib/env";

export const authOptions: NextAuthConfig = {
    adapter: DrizzleAdapter(db),
    providers: [
        GoogleProvider({
            clientId: ENV.GOOGLE_CLIENT_ID as string,
            clientSecret: ENV.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    secret: ENV.AUTH_SECRET,
};
