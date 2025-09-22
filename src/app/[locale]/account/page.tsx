"use client";

import { useState } from "react";
import { User, MapPin, ShoppingBag, Lock, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        {active === "logout" && (
          <Button variant="destructive">Sign Out</Button>
        )}
      </main>
    </div>
  );
}

function ProfileSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Info</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Name: John Doe</p>
        <p>Email: john@example.com</p>
        <p>Phone: +201234567890</p>
        <Button className="mt-4">Edit</Button>
      </CardContent>
    </Card>
  );
}

function AddressesSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Addresses</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border p-3 rounded-lg">
          <p>123 Nile St, Cairo</p>
          <p>Phone: +201234567890</p>
          <span className="text-xs text-green-600 font-bold">Default</span>
          <div className="mt-2 flex gap-2">
            <Button size="sm">Edit</Button>
            <Button size="sm" variant="outline">
              Delete
            </Button>
          </div>
        </div>
        <Button>Add New Address</Button>
      </CardContent>
    </Card>
  );
}

function OrdersSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border p-3 rounded-lg mb-2">
          <p>Order #12345</p>
          <p>Status: Delivered</p>
          <p>Total: $45.00</p>
          <Button size="sm" className="mt-2">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function SecuritySection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <input
          type="password"
          placeholder="Current Password"
          className="border rounded px-2 py-1 w-full"
        />
        <input
          type="password"
          placeholder="New Password"
          className="border rounded px-2 py-1 w-full"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          className="border rounded px-2 py-1 w-full"
        />
        <Button>Update Password</Button>
      </CardContent>
    </Card>
  );
}
