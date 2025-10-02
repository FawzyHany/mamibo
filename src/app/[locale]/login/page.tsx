// app/[locale]/login/page.tsx
import { redirect} from "next/navigation"
import LoginForm from "@/components/auth/LoginForm/page"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"




export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  // ✅ If user is logged in, redirect them to home (or account)
  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (user) {
      return redirect("/account"); // or "/account"
    }
  }

  // ✅ If not logged in, show the login form
  return <LoginForm />;
}