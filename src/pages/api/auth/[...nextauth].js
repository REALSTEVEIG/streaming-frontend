import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
// import EmailProvider from "next-auth/providers/email";
import FacebookProvider from "next-auth/providers/facebook";
import { signIn } from "@/services/user.service";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       password: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    // }),
    CredentialsProvider({
      name: "KTN",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("USER LOGIN R6ESPONSE");
        const payload = {
          email: credentials.email,
          password: credentials.password,
        };
        const user = await signIn(payload);
        console.log("USER LOGIN R6ESPONSE");
        console.log(user);
        if (user.success) {
          return user.data;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    // async signIn(user) {
    //   console.log("USER");
    //   return user;
    // },
    async session({ session, token }) {
      console.log("SESSION");
      console.log(token);
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      console.log("JWT");
      console.log(user);
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
});
