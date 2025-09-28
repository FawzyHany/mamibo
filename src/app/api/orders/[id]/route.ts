import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

  const isAdminOrStaff = user.role === "ADMIN" || user.role === "STAFF";

  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id: id },
    include: {
      address: true,
      items: true,
    },
  });

  // Restrict USERS to only see their own orders
  if (!order || (!isAdminOrStaff && order.userId !== user.id)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(order);
}


export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }>}
) {
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

  // ✅ Only ADMIN or STAFF can update any order
  if (user.role !== "ADMIN" && user.role !== "STAFF") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { id } = await params;
  const { status } = await req.json();

  const order = await prisma.order.findUnique({
    where: { id: id },
    select: { id: true }, // Just verifying it exists
  });

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const updated = await prisma.order.update({
    where: { id: id },
    data: { status },
  });

  return NextResponse.json(updated);
}
