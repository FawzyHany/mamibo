"use client";
import { useState } from "react";
import { User, MapPin, ShoppingBag, Lock, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserProfile } from "@/hooks/useUserProfile";
import EditProfileForm from "@/components/EditProfile/EditProfileForm";
import { EditAddressForm } from "@/components/account/EditAddressForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useUserAddresses } from "@/hooks/useUserAddress";
import { useOrders } from "@/hooks/useOrders"
import { OrderDetailsDialog } from "@/components/orders/OrderDetailsDialog";
import { OrderCard } from "@/components/orders/OrderCard";
import ChangePasswordForm from "@/components/security/ChangePasswordForm";
import { signOut } from "next-auth/react";

type Props = {
  orderId: string
  onClose: () => void
}

const sections = [
  { key: "profile", label: "Profile", icon: User },
  { key: "addresses", label: "Addresses", icon: MapPin },
  { key: "orders", label: "Orders", icon: ShoppingBag },
  { key: "security", label: "Security", icon: Lock },
  { key: "logout", label: "Sign Out", icon: LogOut },
];
export default function AccountDashboard() {
  const [active, setActive] = useState("profile");
  return (
    <div className="flex min-h-screen">
      
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-4 border-r">
       
        <nav className="space-y-2">
         
          {sections.map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              variant={active === key ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActive(key)}
            >
              
              <Icon className="mr-2 h-4 w-4" /> {label}
            </Button>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-6">
        
        {active === "profile" && <ProfileSection />}
        {active === "addresses" && <AddressesSection />}
        {active === "orders" && <OrdersSection />}
        {active === "security" && <SecuritySection />}
        {active === "logout" && <SignOutButton/>}
      </main>
    </div>
  );
}
function ProfileSection() {
  const { data: profile, isLoading, error } = useUserProfile();
  const [editing, setEditing] = useState(false);

  if (isLoading) return <p>Loading profile...</p>;
  if (error) {
    console.error("Profile fetch error:", error);
    return <p className="text-red-500">Failed to load profile</p>;
  }
  if (!profile) return <p>No profile found</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Info</CardTitle>
      </CardHeader>
      <CardContent>
        {!editing ? (
          <>
            <p>
              Name: {profile.firstName} {profile.lastName}
            </p>
            <p>Email: {profile.email}</p>
            <Button className="mt-4" onClick={() => setEditing(true)}>
              Edit
            </Button>
          </>
        ) : (
          <EditProfileForm profile={profile} onClose={() => setEditing(false)} />
        )}
      </CardContent>
    </Card>
  );
}

export function AddressesSection() {
  const { data: addresses, isLoading, error } = useUserAddresses()
  const [open, setOpen] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState<any | null>(null)

  if (isLoading) return <p>Loading addresses...</p>
  if (error) return <p className="text-red-500">Failed to load addresses</p>

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Addresses</h2>
        <Button
          onClick={() => {
            setSelectedAddress(null)
            setOpen(true)
          }}
        >
          Add Address
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {addresses?.map((addr) => (
          <Card key={addr.id} className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{addr.address}</span>
                {addr.isDefault && (
                  <span className="text-xs text-green-600">Default</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm text-gray-600">
              <p>Building: {addr.building}</p>
              <p>Floor: {addr.floor}</p>
              <p>Flat: {addr.flat}</p>
              <p>Landmark: {addr.landmark}</p>
              {addr.lat && addr.lng && (
                <p>
                  📍 {addr.lat}, {addr.lng}
                </p>
              )}
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => {
                  setSelectedAddress(addr)
                  setOpen(true)
                }}
              >
                Edit
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedAddress ? "Edit Address" : "Add Address"}
            </DialogTitle>
          </DialogHeader>
          <EditAddressForm
            address={selectedAddress}
            onSuccess={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export  function OrdersSection() {
  const { data: orders, isLoading, error } = useOrders();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)

  if (isLoading) return <p>Loading orders...</p>
  if (error) return <p className="text-red-500">Failed to load orders</p>

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>My Orders</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onViewDetails={() => setSelectedOrderId(order.id)}
            />
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </CardContent>

      {selectedOrderId && (
        <OrderDetailsDialog
          orderId={selectedOrderId}
          onClose={() => setSelectedOrderId(null)}
        />
      )}
    </Card>
  )
}
export function SecuritySection() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Security</CardTitle>
      </CardHeader>
      <CardContent>
        <ChangePasswordForm />
      </CardContent>
    </Card>
  )
}


export function SignOutButton() {
  return (
    <Button
      variant="destructive"
      onClick={() =>
        signOut({ callbackUrl: "/" }) // redirect to home after logout
      }
    >
      Sign Out
    </Button>
  );
}