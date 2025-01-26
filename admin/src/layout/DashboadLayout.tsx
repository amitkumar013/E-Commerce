import { useState } from "react";
import {
  BarChart3,
  ShoppingCart,
  Users,
  Package,
  Menu,
  X,
  CreditCard,
  Settings,
  ChevronRight,
  User,
  LogOut,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
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
              { icon: BarChart3, label: "Dashboard", active: true },
              { icon: ShoppingCart, label: "Orders" },
              { icon: Users, label: "Customers" },
              { icon: Package, label: "Products" },
              { icon: CreditCard, label: "Transactions" },
              { icon: Settings, label: "Settings" },
            ].map((item, index) => (
              <li key={index}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start transition-colors duration-200",
                    item.active
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  )}
                >
                  <item.icon className="mr-2 h-5 w-5" />
                  {item.label}
                  {item.active && <ChevronRight className="ml-auto h-5 w-5" />}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden mr-2"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                Dashboard Overview
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
              <UserNav />
            </div>
          </div>
        </header>

        <ScrollArea className="h-[calc(100vh-4rem)] p-4 md:p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <DashboardCard
              title="Total Revenue"
              value="$45,231.89"
              description="10% increase from last month"
              icon={CreditCard}
              trend="up"
            />
            <DashboardCard
              title="Orders"
              value="356"
              description="5% increase from last week"
              icon={ShoppingCart}
              trend="up"
            />
            <DashboardCard
              title="Customers"
              value="1,234"
              description="15% new customers this month"
              icon={Users}
              trend="up"
            />
            <DashboardCard
              title="Products"
              value="789"
              description="25 new products added"
              icon={Package}
              trend="neutral"
            />
          </div>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full">
                  <thead>
                    <tr className="border-b dark:border-gray-700">
                      <th className="pb-2 text-left font-medium">Order ID</th>
                      <th className="pb-2 text-left font-medium">Customer</th>
                      <th className="pb-2 text-left font-medium">Status</th>
                      <th className="pb-2 text-right font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        id: "#1234",
                        customer: "John Doe",
                        status: "Shipped",
                        total: "$129.99",
                      },
                      {
                        id: "#1235",
                        customer: "Jane Smith",
                        status: "Processing",
                        total: "$79.99",
                      },
                      {
                        id: "#1236",
                        customer: "Bob Johnson",
                        status: "Delivered",
                        total: "$189.99",
                      },
                      {
                        id: "#1237",
                        customer: "Alice Brown",
                        status: "Pending",
                        total: "$59.99",
                      },
                    ].map((order, index) => (
                      <tr
                        key={index}
                        className="border-b last:border-b-0 dark:border-gray-700"
                      >
                        <td className="py-2">{order.id}</td>
                        <td className="py-2">{order.customer}</td>
                        <td className="py-2">
                          <Badge variant={getStatusVariant(order.status)}>
                            {order.status}
                          </Badge>
                        </td>
                        <td className="py-2 text-right">{order.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}

function DashboardCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
  trend: "up" | "down" | "neutral";
}) {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1 flex items-center">
          {trend === "up" && (
            <TrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
          )}
          {trend === "down" && (
            <TrendingDownIcon className="w-4 h-4 text-red-500 mr-1" />
          )}
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@johndoe" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">John Doe</p>
            <p className="text-xs leading-none text-muted-foreground">
              john.doe@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function TrendingUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function TrendingDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </svg>
  );
}

function getStatusVariant(
  status: string
): "default" | "secondary" | "destructive" | "outline" {
  switch (status.toLowerCase()) {
    case "shipped":
      return "default";
    case "processing":
      return "secondary";
    case "pending":
      return "outline";
    case "delivered":
      return "default";
    default:
      return "default";
  }
}
