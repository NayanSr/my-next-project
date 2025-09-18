import { loginUser } from "@/app/actions/auth/loginUser";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import dbConnect from "./dbConnect";
// import { signIn } from "next-auth/react";


export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Enter Password" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                console.log(credentials)
                const user = await loginUser(credentials);
                console.log(user)


                // if (res.ok && user) {
                if (user) {
                    return user
                }
                // Return null if user data could not be retrieved
                return null
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,

                },
            },
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],
    pages: {
        signIn: "/signin"
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            // console.log({user,account, profile, email, credentials});
            console.log({ user });
            if (account) {
                const { providerAccountId, provider } = account;
                const { email: user_email, image, name } = user;
                const usersCollection = dbConnect('users');
                const isExist = await usersCollection.findOne({ providerAccountId })
                if (!isExist) {
                    const payload = {
                        providerAccountId, provider, email:
                            user_email, image, name
                    };
                    await usersCollection.insertOne(payload)
                }
            }
            return true;
        }
    }
}