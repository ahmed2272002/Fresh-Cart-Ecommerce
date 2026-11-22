import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import type { ReactNode } from "react";

interface UserData {
  name: string;
  email: string;
  role: string;
  _id?: string;
  id?: string;
}

declare module "next-auth" {
  interface User {
    user: UserData;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: UserData;
    token?: string;
    id?: string;
    _id?: string;
    userId?: string;
    sub?: string;
  }
}

// Extend Next.js PageProps for App Router dynamic routes
declare global {
  interface LayoutProps<T extends string = "/"> {
    children: ReactNode;
    params: T extends "/" ? {} : { [key: string]: string | string[] | undefined };
  }

  interface PageProps<T extends string = "/"> extends LayoutProps<T> {
    params: T extends "/" ? Promise<{ [key: string]: string | string[] | undefined }> : Promise<{ [key: string]: string | string[] | undefined }>;
  }
}
