// app/api/cart/route.ts
import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";
import { getOrCreateSessionId } from "@/lib/session";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AddToCartRequest } from "@/lib/schemas";


export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);  
    console.log("Session:", session);
    let userId: string | null = null;
    let sessionId: string | null = null;

    // 🔐 Check if user is logged in
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true },
      });

      if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      userId = user.id;
    } else {
      sessionId = await getOrCreateSessionId();
    }
    const body = await req.json();
    const result = AddToCartRequest.safeParse(body);
   
    if (!result.success) {
      return Response.json({ error: "Invalid request", details: result.error.format() }, { status: 400 });
    }
  
    const { menuItemId, sizeOptionId, crustOptionId, quantity } = result.data;
    

    // 🔄 Find or create cart based on userId or sessionId
    let cart=null;

    if (userId) {
      cart = await prisma.cart.findFirst({ where: { userId } });
      if (!cart) {
        cart = await prisma.cart.create({ data: { userId } });
      }
    } else {
      cart = await prisma.cart.findFirst({ where: { sessionId } });
      if (!cart) {
        cart = await prisma.cart.create({ data: { sessionId } });
      }
    }

    // ✅ Menu item validation
    const menuItem = await prisma.menuItem.findUnique({ where: { id: menuItemId } });
    if (!menuItem || !menuItem.price) {
      return NextResponse.json({ error: "Invalid menu item" }, { status: 400 });
    }

    let multiplier = 1;
    if (sizeOptionId) {
      const size = await prisma.menuItemSize.findUnique({ where: { id: sizeOptionId } });
      if (!size) return NextResponse.json({ error: "Invalid size option" }, { status: 400 });
      multiplier = size.multiplier.toNumber();
    }

    let crustPrice = 0;
    if (crustOptionId) {
      const crust = await prisma.menuItemCrust.findUnique({ where: { id: crustOptionId } });
      if (!crust) return NextResponse.json({ error: "Invalid crust option" }, { status: 400 });
      crustPrice = crust.price.toNumber();
    }

    const unitPrice = menuItem.price.toNumber() * multiplier + crustPrice;
    const lineTotal = unitPrice * quantity;

    // 🧾 Check for existing cart item
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        menuItemId,
        sizeOptionId: sizeOptionId,
        crustOptionId: crustOptionId,
      },
    });


    if (existingItem) {
       await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + quantity,
          lineTotal: unitPrice * (existingItem.quantity + quantity),
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          menuItemId,
          sizeOptionId,
          crustOptionId,
          quantity,
          unitPrice,
          lineTotal,
          itemNameSnapshot: menuItem.name,
          imageUrlSnapshot: menuItem.imageUrl,
        },
      });
    }

    // 🔁 Return updated cart
    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: { items: true },
    });

    return NextResponse.json(updatedCart);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("Unknown error:", err);
    }
  
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// app/api/cart/route.ts


// -----------------
// Helper: Cart Totals
// -----------------


function calculateCartTotals(items: { lineTotal: Decimal }[]) {
  const subtotal = items.reduce((sum, item) => {
    return sum + item.lineTotal.toNumber();
  }, 0);


  const discount = 0;
  const taxRate = 0.1;
  const tax = subtotal * taxRate;
  const total = subtotal - discount + tax;

  const round = (n: number) => Math.round(n * 100) / 100;

  return {
    subtotal: round(subtotal),
    discount: round(discount),
    tax: round(tax),
    total: round(total),
  };
}


export async function GET() {
  try {
  
    const session = await getServerSession(authOptions);

    let userId: string | null = null;
    let sessionId: string | null = null;

    // 2. If logged in, get userId
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true },
      });

      if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      userId = user.id;
    } else {
      // 3. Otherwise, treat as guest and get or create sessionId
      sessionId = await getOrCreateSessionId();
    }

    // 4. Fetch cart by userId or sessionId
    const cart = await prisma.cart.findFirst({
      where: {
        ...(userId ? { userId } : { sessionId }),
      },
      include: {
        items: {
          include: {
            sizeOption: true,
            crustOption: true,
          },
        },
      },
    });
 
    if (!cart) {
      console.log("⚠️ No cart found for this session");
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }
    
    const totals = calculateCartTotals(cart.items);

    return NextResponse.json({
      cart: {
        id: cart.id,
        sessionId: cart.sessionId,
        items: cart.items,
        ...totals,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("Unknown error:", err);
    }
  
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}