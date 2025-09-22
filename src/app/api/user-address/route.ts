import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";


// Zod schema for validation
const userAddressSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  address: z.string(),
  building: z.string().optional(),
  floor: z.string().optional(),
  flat: z.string().optional(),
  landmark: z.string().optional(),
  lat: z.number(),
  lng: z.number(),
  isDefault: z.boolean().optional(),
});

// ✅ GET all user addresses
export async function GET() {
  const session = await getServerSession(authOptions);
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

  const addresses = await prisma.userAddress.findMany({
    where: { userId: user.id },
  });

  return NextResponse.json(addresses);
}

// ✅ POST create new address
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ✅ Validate with Zod
    const body = await req.json();
const result = userAddressSchema.safeParse(body);

if (!result.success) {
  return NextResponse.json(
    { error: result.error.flatten() },
    { status: 400 }
  );
}

const { isDefault, ...addressData } = result.data;

if (isDefault) {
  const [, address] = await prisma.$transaction([
    prisma.userAddress.updateMany({
      where: { userId: user.id, isDefault: true },
      data: { isDefault: false },
    }),
    prisma.userAddress.create({
      data: {
        ...addressData,
        isDefault: true,
        userId: user.id,
      },
    }),
  ]);

  return NextResponse.json(address, { status: 201 });
}


    const address = await prisma.userAddress.create({
      data: {
        ...addressData,
        userId: user.id,
      },
    });

    return NextResponse.json(address, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create address" }, { status: 500 });
  }
}
