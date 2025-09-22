import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import bcrypt from 'bcryptjs';

export const userSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string(),
  lastName: z.string().optional(),
  password: z.string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  .regex(/[a-z]/, "Must contain at least one lowercase letter")
  .regex(/[0-9]/, "Must contain at least one number")
  .regex(/[^a-zA-Z0-9]/, "Must contain at least one special character"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = userSchema.safeParse(body);

    if (!parsed.success) {
      console.log("Validation error:", parsed.error.flatten());
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { email, firstName, lastName, password } = parsed.data;

    const existingEmail= await prisma.user.findUnique({
      where: {email: email}
    });

    if(existingEmail){
      return NextResponse.json({user:null, message: "Email already exist"}, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: hashedPassword,
      },
    });
    console.log("New user created:", newUser);
    const {password:unvinsiblePass, ...rest}=newUser;
    return NextResponse.json({ rest });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
