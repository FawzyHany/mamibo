// app/api/auth/verify-password/route.ts
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new Response(JSON.stringify({ valid: false }), { status: 401 });
  }

  const { password } = await req.json();

  // Find the user in DB
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return new Response(JSON.stringify({ valid: false }), { status: 404 });
  }

  // Compare password with hashed one in DB
  const isValid = await bcrypt.compare(password, user.password);

  return new Response(JSON.stringify({ valid: isValid }), { status: 200 });
}
