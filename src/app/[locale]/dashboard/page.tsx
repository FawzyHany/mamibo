import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import DashboardClient from "@/components/dashboard/DashboardClient/DashboardClient"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    redirect("/login") // Redirect to login
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { role: true },
  })

  if (!user || (user.role !== "ADMIN" && user.role !== "STAFF")) {
    redirect("/unauthorized") // Redirect to unauthorized page
  }

  // Authorized — render client dashboard
  return <DashboardClient />
}