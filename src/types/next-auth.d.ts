import NextAuth from "next-auth/next";

interface IUser {
  _id: string;
  username: string;
  email: string;
  isVerify: string;
  type: string;
  role: string;
}
declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    refresh_token: string;
    user: IUser;
  }
}
declare module "next-auth" {
  interface Session {
    user: IUser;
    access_token: string;
    refresh_token: string;
  }
}
