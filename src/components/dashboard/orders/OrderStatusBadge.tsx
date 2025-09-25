export function OrderStatusBadge({ status }: { status: string }) {
  const colorMap: Record<string, string> = {
    PREPARING: "bg-yellow-200 text-yellow-800",
    OUT_FOR_DELIVERY: "bg-blue-200 text-blue-800",
    DELIVERED: "bg-green-200 text-green-800",
    CANCELLED: "bg-red-200 text-red-800",
  }

  return <span className={`px-2 py-1 text-xs rounded ${colorMap[status] ?? "bg-gray-200"}`}>{status.replace(/_/g, " ")}</span>
}
