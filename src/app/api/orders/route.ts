import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });
  
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  
  // Now you can safely use `user.id`
  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: {
      address: true,
      items: true,
    },
    orderBy: { createdAt: "desc" },
  });
  

  return NextResponse.json(orders)
}
