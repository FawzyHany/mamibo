// app/dashboard/loading.js
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Skeleton for a main chart/stat area */}
      <Skeleton className="col-span-2 h-[200px]" />
      
      {/* Skeleton for a user/profile card */}
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  )
}