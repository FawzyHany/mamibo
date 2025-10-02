import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma";


export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, role: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status"); // "active", "history", or null

  let statusFilter = {};

  if (status === "active") {
    statusFilter = {
      status: { in: ["PREPARING", "OUT_FOR_DELIVERY"] },
    };
  } else if (status === "history") {
    statusFilter = {
      status: { in: ["DELIVERED", "CANCELLED"] },
    };
  }

  // ✅ Role-based logic
  const isAdminOrStaff = user.role === "ADMIN" || user.role === "STAFF";

  const whereClause = {
    ...(isAdminOrStaff ? {} : { userId: user.id }),
    ...statusFilter,
  };

  const orders = await prisma.order.findMany({
    where: whereClause,
    include: {
      address: true,
      items: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(orders);
}
