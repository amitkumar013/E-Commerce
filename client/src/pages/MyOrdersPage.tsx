import { useEffect, useState } from "react";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

interface OrderItem {
  id: string;
  name: string;
  images: string;
  price: number;
  orderStatus: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  date: string;
}

export default function OrderList() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const URI = import.meta.env.VITE_BACKEND_URL;
  const hasOrders = orders.length > 0;
  const navigate = useNavigate();

  const getOrderDetail = async () => {
    const authData = localStorage.getItem("auth");
    let token;
    const parsedAuth = authData ? JSON.parse(authData) : null;
    token = parsedAuth?.token;

    if (!token) {
      toast.error("Session expired or not logged in. Redirecting to login.");
      navigate("/auth/login");
      return;
    }

    try {
      const { data } = await axios.get(`${URI}/api/v1/orders/get-order`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const mappedOrders = data.data.map((order: any) => ({
        id: order._id,
        name: order.orderItems[0]?.name || "Unknown Item",
        images: order.orderItems[0]?.images,
        price: order.totalAmount,
        orderStatus: order.orderStatus,
        date: order.date,
      }));

      setOrders(mappedOrders);
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error("Unauthorized access. Please log in again.");
        navigate("/auth/login");
      }
    }
  };

  useEffect(() => {
    getOrderDetail();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processing":
        return "bg-blue-100 text-blue-800 hover:bg-blue-400";
      case "Shipped":
        return "bg-purple-100 text-purple-800 hover:bg-purple-400";
      case "Delivered":
        return "bg-green-100 text-green-800 hover:bg-green-400";
      case "Cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-400";
      default:
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-400";
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);
  };

  return (
    <div className="mt-16 container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
          <p className="text-muted-foreground mt-1">View your order history</p>
        </div>
        <Link to="/collection">
          <Button size="lg" className="min-w-[200px]">
            Continue Shopping
            <ShoppingBag className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      {hasOrders ? (
        <div className="grid gap-4">
          {orders.map((order, index) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="bg-muted/50 p-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Order {index + 1}</CardTitle>
                  <Badge className={getStatusColor(order.orderStatus)}>
                    {order.orderStatus.charAt(0).toUpperCase() +
                      order.orderStatus.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src={order.images || "/placeholder.svg"}
                      alt={order.name}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h3 className="font-medium text-base sm:text-lg truncate">
                      {order.name}
                    </h3>
                    <div className="mt-1">
                      <span className="font-semibold">
                        {formatPrice(order.price)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <p className="font-medium text-gray-700">Date:</p>
                    <p className="font-medium text-gray-700">
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                    <p className="mt-1 font-medium text-gray-700">Time:</p>
                    <p className="font-medium text-gray-700">
                      {new Date(order.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
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
              You haven't purchased any products yet. Start shopping to see your
              orders here.
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
  );
}
