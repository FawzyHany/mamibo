"use client"

import { useState } from "react"
import { ActiveOrderList } from "@/components/dashboard/orders/ActiveOrderList"
import { OrderHistoryList } from "@/components/dashboard/orders/OrderHistoryList"
import ContactMessages from "@/components/ContactForm/ContactMessages"
import ProductsStock from "@/components/dashboard/products/ProductsStock"



type Section =
  | "activeOrders"
  | "orderHistory"
  | "productsStock"
  | "Contacts"
  | "categories"
  | "productsCrud"
  | "siteContent"

export default function DashboardPage() {
  const [active, setActive] = useState<Section>("activeOrders")

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
        <h2 className="text-lg font-bold mb-6">Dashboard</h2>

        {/* Staff Section */}
        <span className="text-xs font-semibold text-gray-500 mb-2">Staff</span>
        <nav className="flex flex-col gap-2">
          <button
            onClick={() => setActive("activeOrders")}
            className={`p-2 text-left rounded ${
              active === "activeOrders" ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            Active Orders
          </button>
          <button
            onClick={() => setActive("orderHistory")}
            className={`p-2 text-left rounded ${
              active === "orderHistory" ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            Order History
          </button>
          <button
            onClick={() => setActive("productsStock")}
            className={`p-2 text-left rounded ${
              active === "productsStock" ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            Products (Stock)
          </button>
          <button
            onClick={() => setActive("Contacts")}
            className={`p-2 text-left rounded ${
              active === "productsStock" ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            Contacts
          </button>
        </nav>

        {/* Divider */}
        <div className="my-4 border-t border-gray-300" />

        {/* Admin Section */}
        <span className="text-xs font-semibold text-gray-500 mb-2">Admin</span>
        <nav className="flex flex-col gap-2">
          <button
            onClick={() => setActive("categories")}
            className={`p-2 text-left rounded ${
              active === "categories" ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            Categories (CRUD)
          </button>
          <button
            onClick={() => setActive("productsCrud")}
            className={`p-2 text-left rounded ${
              active === "productsCrud" ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            Products (CRUD)
          </button>
          <button
            onClick={() => setActive("siteContent")}
            className={`p-2 text-left rounded ${
              active === "siteContent" ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            Website Content
          </button>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {active === "activeOrders" && <ActiveOrderList />}
        {active === "orderHistory" && <OrderHistoryList />}
        {active === "productsStock" && <ProductsStock />}
        {active === "Contacts" && <ContactMessages/>}
        {active === "productsCrud" && <h1 className="text-2xl font-semibold">Products (CRUD)</h1>}
        {active === "siteContent" && <h1 className="text-2xl font-semibold">Website Content</h1>}
      </main>
    </div>
  )
}







