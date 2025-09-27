"use client";
import { useState } from "react";
import { User, MapPin, ShoppingBag, Lock, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfileSection } from "@/components/account/ProfileSection";
import AddressesSection from "@/components/account/AddressesSection";
import { OrdersSection, SecuritySection } from "@/components/account/OrdersSection";
import { SignOutButton } from "@/components/account/SignOutButton";

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
