import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Eye, Save, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
interface OrderItem {
  id: string;
  name: string;
  images: string;
  price: number;
  orderStatus:
    | "Order placed"
    | "Processing"
    | "Shipped"
    | "Delivered"
    | "Cancelled";
  quantity: number;
  totalAmount: number;
  paymentStatus: "Paid" | "Cash" | "Pending" | "Failed";
  date: string;
  shippingAddress: {
    name: string;
    phone: number;
    address: string;
    city: string;
    state: string;
    zipCode: number;
    country: string;
  };
}

export default function OrdersPage() {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [editingStatus, setEditingStatus] = useState<Record<string, boolean>>(
    {}
  );
  const [orderStatuses, setOrderStatuses] = useState<Record<string, string>>(
    {}
  );
  const [viewCustomer, setViewCustomer] = useState<{
    isOpen: boolean;
    shippingAddress: any | null;
    orderId: string;
  }>({
    isOpen: false,
    shippingAddress: null,
    orderId: "",
  });
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const URI = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  //-------Get All Order Details-------//
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
      const { data } = await axios.get(`${URI}/api/v1/orders/get-all-orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const mappedOrders = data.data.map((order: any) => {
        const price = order.orderItems[0]?.price || 0;
        const quantity = order.orderItems[0]?.quantity || 0;
        return {
          id: order._id,
          name: order.orderItems[0]?.name || "Unknown Item",
          images: order.orderItems[0]?.images,
          price,
          quantity,
          totalAmount: price * quantity,
          orderStatus: order.orderStatus || "Order Placed",
          paymentStatus: order.paymentStatus,
          shippingAddress: order.shippingAddress,
          date: order.date,
        };
      });

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

  //-------Update Order Status-------//
  const updateOrderStatus = async (
    orderId: string,
    status:
      | "order placed"
      | "processing"
      | "shipped"
      | "delivered"
      | "cancelled"
  ) => {
    const authData = localStorage.getItem("auth");
    const token = authData ? JSON.parse(authData).token : null;

    if (!token) {
      toast.error("Session expired. Please log in again.");
      navigate("/auth/login");
      return;
    }

    try {
      const { data } = await axios.patch(
        `${URI}/api/v1/orders/update-order-status/${orderId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data?.success) {
        toast.success("Order status updated successfully.");
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId
              ? { ...order, orderStatus: status as OrderItem["orderStatus"] }
              : order
          )
        );
      } else {
        toast.error("Failed to update order status.");
      }
    } catch (error: any) {
      toast.error("Something went wrong while updating the order status.");
    }
  };

  const toggleEditStatus = (id: string) => {
    setEditingStatus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const saveOrderStatus = (orderId: string) => {
    const status = orderStatuses[orderId];
    if (!status) {
      toast.error("Please select a status before saving.");
      return;
    }
    updateOrderStatus(
      orderId,
      status as
        | "order placed"
        | "processing"
        | "shipped"
        | "delivered"
        | "cancelled"
    );
    toggleEditStatus(orderId);
  };

  //-------View Shipping Address-------//
  const openCustomerView = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (order) {
      setViewCustomer({
        isOpen: true,
        shippingAddress: order.shippingAddress,
        orderId: orderId,
      });
    }
  };

  //-------Close View Address---------//
  const closeCustomerView = () => {
    setViewCustomer({
      isOpen: false,
      shippingAddress: null,
      orderId: "",
    });
  };

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getStatusBadgeClass = (status: string) => {
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

  const getPaymentBadgeClass = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 hover:bg-green-400";
      case "cash":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-400";
      case "Failed":
      default:
        return "bg-red-100 text-red-800 hover:bg-red-400";
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 bg-slate-50">
      <h1 className="mb-6 text-2xl font-bold text-slate-800">
        Order Management
      </h1>

      {/* Orders table */}
      <div className="rounded-lg border bg-white shadow">
        {/* Desktop table */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow className="bg-teal-50">
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="hover:bg-teal-50/30">
                  <TableCell>
                    <img
                      src={order.images || "/placeholder.svg"}
                      alt={order.name}
                      width={50}
                      height={50}
                      className="rounded-md border object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {order.name || "Unknown Product"}
                  </TableCell>
                  <TableCell>
                    ₹{(order.price || 0).toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell>{order.quantity || 0}</TableCell>
                  <TableCell>
                    ₹{(order.totalAmount || 0).toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={getPaymentBadgeClass(order.paymentStatus)}
                    >
                      {order.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {editingStatus[order.id] ? (
                      <div className="flex items-center space-x-2">
                        <Select
                          value={orderStatuses[order.id]}
                          onValueChange={(value) =>
                            setOrderStatuses((prev) => ({
                              ...prev,
                              [order.id]: value,
                            }))
                          }
                        >
                          <SelectTrigger className="w-[130px]">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="order placed"> Order placed </SelectItem>
                            <SelectItem value="Processing"> Processing </SelectItem>
                            <SelectItem value="Shipped">Shipped</SelectItem>
                            <SelectItem value="Delivered">Delivered</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => saveOrderStatus(order.id)}
                          className="h-8 w-8 text-teal-600"
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => toggleEditStatus(order.id)}
                          className="h-8 w-8 text-slate-600"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Badge className={getStatusBadgeClass( orderStatuses[order.id] || order.orderStatus )}
                      >
                        {orderStatuses[order.id] || order.orderStatus}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 border-teal-200 text-teal-700 hover:bg-teal-50"
                        onClick={() => openCustomerView(order.id)}
                      >
                        <Eye className="mr-1 h-3 w-3" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="default"
                        className="h-8 bg-teal-600 hover:bg-teal-700"
                        onClick={() => toggleEditStatus(order.id)}
                      >
                        Edit
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile view */}
        <div className="md:hidden">
          <div className="divide-y">
            {orders.map((order) => (
              <div key={order.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={order.images || "/placeholder.svg"}
                      alt={order.name}
                      width={40}
                      height={40}
                      className="rounded-md border object-cover"
                    />
                    <div>
                      <div className="font-medium">{order.name}</div>
                      <div className="text-sm text-slate-500">
                        ID: {order.id}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleRow(order.id)}
                    className="text-teal-600"
                  >
                    {expandedRows[order.id] ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                {expandedRows[order.id] && (
                  <div className="mt-4 grid gap-2 text-sm">
                    <div className="grid grid-cols-2 gap-1">
                      <div className="text-slate-500">Price:</div>
                      <div>₹{order.price}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <div className="text-slate-500">Quantity:</div>
                      <div>{order.quantity}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <div className="text-slate-500">Total:</div>
                      <div className="font-medium">₹{order.totalAmount}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <div className="text-slate-500">Payment:</div>
                      <div>
                        <Badge
                          className={getPaymentBadgeClass(order.paymentStatus)}
                        >
                          {order.paymentStatus}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <div className="text-slate-500">Status:</div>
                      <div>
                        {editingStatus[order.id] ? (
                          <div className="flex items-center space-x-2">
                            <Select
                              value={orderStatuses[order.id]}
                              onValueChange={(value) =>
                                setOrderStatuses((prev) => ({
                                  ...prev,
                                  [order.id]: value,
                                }))
                              }
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="order placed">
                                  {" "}
                                  Order placed{" "}
                                </SelectItem>
                                <SelectItem value="Processing">
                                  {" "}
                                  Processing{" "}
                                </SelectItem>
                                <SelectItem value="Shipped">Shipped</SelectItem>
                                <SelectItem value="Delivered">
                                  {" "}
                                  Delivered{" "}
                                </SelectItem>
                                <SelectItem value="Cancelled">
                                  {" "}
                                  Cancelled{" "}
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => saveOrderStatus(order.id)}
                              className="h-8 w-8 text-teal-600"
                            >
                              <Save className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <Badge
                            className={getStatusBadgeClass(
                              orderStatuses[order.id] || order.orderStatus
                            )}
                          >
                            {orderStatuses[order.id] || order.orderStatus}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 flex justify-end space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 border-teal-200 text-teal-700"
                        onClick={() => openCustomerView(order.id)}
                      >
                        <Eye className="mr-1 h-3 w-3" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="default"
                        className="h-8 bg-teal-600 hover:bg-teal-700"
                        onClick={() => toggleEditStatus(order.id)}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Details Modal */}
      <Dialog open={viewCustomer.isOpen} onOpenChange={closeCustomerView}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-teal-700">
              Customer Information
            </DialogTitle>
            <DialogDescription>
              Order ID: {viewCustomer.orderId}
            </DialogDescription>
          </DialogHeader>
          {viewCustomer.shippingAddress && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-right font-medium text-slate-500">
                  Name:
                </div>
                <div className="col-span-3">
                  {viewCustomer.shippingAddress.name}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-right font-medium text-slate-500">
                  Phone:
                </div>
                <div className="col-span-3">
                  {viewCustomer.shippingAddress.phone}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-right font-medium text-slate-500">
                  Address:
                </div>
                <div className="col-span-3">
                  {viewCustomer.shippingAddress.address}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-right font-medium text-slate-500">
                  City:
                </div>
                <div className="col-span-3">
                  {viewCustomer.shippingAddress.city}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-right font-medium text-slate-500">
                  State:
                </div>
                <div className="col-span-3">
                  {viewCustomer.shippingAddress.state}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-right font-medium text-slate-500">
                  Zipcode:
                </div>
                <div className="col-span-3">
                  {viewCustomer.shippingAddress.zipCode}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-right font-medium text-slate-500">
                  Country:
                </div>
                <div className="col-span-3">
                  {viewCustomer.shippingAddress.country}
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-end">
            <Button
              variant="default"
              onClick={closeCustomerView}
              className="bg-teal-600 hover:bg-teal-700"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
