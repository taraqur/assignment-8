import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client } from "./db";

export const auth = betterAuth({
    database: mongodbAdapter(client.db(), {
        client: client
    }),
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    emailAndPassword: {
        enabled: true
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }
    },
    user: {
        additionalFields: {
            image: {
                type: "string",
                required: false
            }
        }
    }
});
