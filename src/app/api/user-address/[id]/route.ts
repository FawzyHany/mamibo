// app/api/user-address/[id]/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const updateSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  building: z.string().optional(),
  floor: z.string().optional(),
  flat: z.string().optional(),
  landmark: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  isDefault: z.boolean().optional(),
});

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const parsed = updateSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true }});
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const updateData = parsed.data;

    if (updateData.isDefault === true) {
      // Unset other defaults then set this one
      const updated = await prisma.$transaction(async (tx) => {
        const { id } = await params;
        await tx.userAddress.updateMany({
          where: { userId: user.id, isDefault: true },
          data: { isDefault: false },
        });
        return tx.userAddress.update({
          where: { id: id },
          data: updateData,
        });
      });
      return NextResponse.json(updated);
    } else {
      const { id } = await params;
      // Regular update
      const address = await prisma.userAddress.update({
        where: { id:id },
        data: updateData,
      });
      return NextResponse.json(address);
    }
  } catch (err) {
    console.error("PATCH userAddress error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true }});
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Make sure the address belongs to this user and remember if it was default
    const { id } = await params;
    const addressBefore = await prisma.userAddress.findUnique({
      where: { id:id },
    });

    if (!addressBefore) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (addressBefore.userId !== user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.$transaction(async (tx) => {
      const { id } = await params;
      await tx.userAddress.delete({ where: { id: id } });

      // If deleted was default, set another address as default (optional)
      if (addressBefore.isDefault) {
        const another = await tx.userAddress.findFirst({
          where: { userId: user.id },
          orderBy: { createdAt: "desc" },
        });
        if (another) {
          await tx.userAddress.update({
            where: { id: another.id },
            data: { isDefault: true },
          });
        }
      }
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE userAddress error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
