import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BarChart3,
  ShoppingCart,
  Users,
  Package,
  CreditCard,
  Settings,
  ChevronRight,
  X,
  LucidePercentDiamond,
} from "lucide-react";
import Header from "@/components/Header";
import { Toaster } from 'react-hot-toast';

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
      {/* Sidebar with overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity md:hidden",
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => setIsSidebarOpen(false)}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-transform duration-300 ease-in-out transform shadow-lg md:relative md:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold text-primary">Admin Dashboard</h2>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="mt-8">
          <ul className="space-y-2 px-4">
            {[
              { icon: BarChart3, label: "Dashboard", path: "/", active: false },
              { icon: Users, label: "Add Category", path: "admin/category" },
              { icon: ShoppingCart, label: "Add Product", path: "admin/add-product" },
              { icon: LucidePercentDiamond, label: "Product Manage", path: "admin/product-management" },
              { icon: ShoppingCart, label: "Orders", path: "/orders" },
              { icon: Package, label: "Products", path: "/products" },
              { icon: CreditCard, label: "Transactions", path: "/transactions" },
              { icon: Settings, label: "Settings", path: "/settings" },
            ].map((item, index) => (
              <li key={index}>
                <Link to={item.path}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start flex items-center space-x-2 py-2 px-3 rounded-lg transition-colors duration-200",
                      item.active
                        ? "bg-primary text-white"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                    {item.active && <ChevronRight className="ml-auto h-5 w-5" />}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <Header onSidebarToggle={() => setIsSidebarOpen(true)} />
        <Toaster position="top-center" />
        <ScrollArea className="h-[calc(100vh-4rem)] p-4 md:p-6">
        
          <Outlet />

        </ScrollArea>
         
      </main>
    </div>
  );
}
