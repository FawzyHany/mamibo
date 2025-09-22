import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
      
        if (!credentials?.email || !credentials?.password) {
     
        return null;}
      

        // 1. Find user
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) return null;

        // 2. Compare password
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid){

        return null;}
        

        // 3. Return user (NextAuth stores in session/JWT)
      
        return {
          id: user.id,
          email: user.email,
          name: user.firstName + " " + (user.lastName ?? ""),
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  
    error: "/login",   
  },
};