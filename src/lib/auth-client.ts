import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: "https://assignment-8-seven-alpha.vercel.app"

export const { signIn, signUp, useSession } = authClient;