import { loginUser } from "@/app/actions/auth/loginUser";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

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
                        const user= await loginUser(credentials);
                        console.log(user)
                        /* const res = await fetch("/your/endpoint", {
                              method: 'POST',
                              body: JSON.stringify(credentials),
                              headers: { "Content-Type": "application/json" }
                        })
                        const user = await res.json()
 */

                        // if (res.ok && user) {
                        if (user) {
                              return user
                        }
                        // Return null if user data could not be retrieved
                        return null
                  }
            })
      ],
      pages: {
            signIn: "/signin"
      }
}



const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }