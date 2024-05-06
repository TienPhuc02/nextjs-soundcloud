import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { AuthOptions } from "next-auth";
export const authOptions: AuthOptions = {
  secret: process.env.NO_SECRET,
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // ...add more providers here
    //callback là gọi lại 1 hàm sau khi login thành công
  ],
  callbacks: {
    jwt({ token, trigger, user, profile, account }) {
      if (trigger === "signIn" && account?.provider === "github") {
        token.address = "Phuc";
      }
      return token;
    },
    session({ session, token, user }) {
      //@ts-ignore
      session.address = token.address;
      return session;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
