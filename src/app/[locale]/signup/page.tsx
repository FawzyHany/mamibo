// components/SignupForm.tsx
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect} from "next/navigation"
import SignupForm from "@/components/auth/SignUpForm/page";

export default async function Signup() {
  const session = await getServerSession(authOptions);

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (user) {
      return redirect("/account");
    }
  }

  return (
    <SignupForm/>
  );
}
