import { SigninUser } from "@/services/auth.service";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const response = await SigninUser({
          email: credentials?.email,
          password: credentials?.password,
        });

        if (response.message === "success") {
          return response;
        } else {
          throw new Error(response.message || "Invalid Credentials");
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    // create token to save it on cookies server
    async jwt({ token, user }) {
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }

      return token;
    },

    // takes token from server and return session data 
    async session({ session, token }) {
        
        if(token){
            session.user = token.user;
        }


      return session
    },


  },
};
