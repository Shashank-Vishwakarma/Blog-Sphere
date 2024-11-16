import NextAuth from "next-auth";
import { authOptions } from "./app/api/auth/[...nextauth]/options";

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions);
