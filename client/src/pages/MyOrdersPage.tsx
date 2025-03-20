import { useState } from "react"
import { format } from "date-fns"
import { Package, ShoppingBag, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface Order {
  id: string
  date: Date
  status: "processing" | "shipped" | "delivered"
  total: number
  items: number
}

export default function MyOrder() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-12345",
      date: new Date(2023, 2, 15),
      status: "delivered",
      total: 129.99,
      items: 3,
    },
    {
      id: "ORD-12346",
      date: new Date(2023, 3, 2),
      status: "shipped",
      total: 79.99,
      items: 2,
    },
    {
      id: "ORD-12347",
      date: new Date(2023, 3, 10),
      status: "processing",
      total: 49.99,
      items: 1,
    },
    
  ])

  const hasOrders = orders.length > 0

  return (  
    <div className="mt-16 container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
          <p className="text-muted-foreground mt-1">View and track your order history</p>
        </div>
        <Button className="mt-4 md:mt-0">
          Continue Shopping
          <ShoppingBag className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {hasOrders ? (
        <div className="grid gap-6">
          {orders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="bg-muted/50 p-4 md:p-6">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <CardTitle className="text-lg md:text-xl">{order.id}</CardTitle>
                    <CardDescription>Ordered on {format(order.date, "MMMM d, yyyy")}</CardDescription>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <Badge
                      className={
                        order.status === "delivered"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : order.status === "shipped"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                            : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                      }
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-muted-foreground mr-2" />
                    <span>
                      {order.items} {order.items === 1 ? "item" : "items"}
                    </span>
                  </div>
                  <div className="mt-2 md:mt-0 font-medium">Total: ${order.total.toFixed(2)}</div>
                </div>
              </CardContent>
              <Separator />
              <CardFooter className="p-4 md:p-6 flex justify-end">
                <Link to={`/orders/${order.id}`}>
                  <Button variant="outline" size="sm">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center p-8 md:p-12">
          <div className="flex flex-col items-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <ShoppingBag className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">No Orders Yet</h2>
            <p className="text-muted-foreground mb-6">
              You haven't purchased any products yet. Start shopping to see your orders here.
            </p>
            <Link to="/products">
              <Button className="px-8">
                Browse Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  )
}

