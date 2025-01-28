import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, ShoppingCart, Users, Package } from "lucide-react";

export default function DashboardPage() {
  return (
    <div>
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
                  { id: "#1234", customer: "John Doe", status: "Shipped", total: "$129.99" },
                  { id: "#1235", customer: "Jane Smith", status: "Processing", total: "$79.99" },
                  { id: "#1236", customer: "Bob Johnson", status: "Delivered", total: "$189.99" },
                  { id: "#1237", customer: "Alice Brown", status: "Pending", total: "$59.99" },
                ].map((order, index) => (
                  <tr key={index} className="border-b last:border-b-0 dark:border-gray-700">
                    <td className="py-2">{order.id}</td>
                    <td className="py-2">{order.customer}</td>
                    <td className="py-2">
                      <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                    </td>
                    <td className="py-2 text-right">{order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
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
          {trend === "up" && <TrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />}
          {trend === "down" && <TrendingDownIcon className="w-4 h-4 text-red-500 mr-1" />}
          {description}
        </p>
      </CardContent>
    </Card>
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

function getStatusVariant(status: string): "default" | "secondary" | "destructive" | "outline" {
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

