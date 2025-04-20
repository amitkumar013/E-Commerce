// import { useState } from 'react';
// import { Edit2, Check, X } from 'lucide-react';

// interface Order {
//   id: string;
//   image: string;
//   name: string;
//   price: number;
//   quantity: number;
//   totalAmount: number;
//   paymentStatus: 'Paid' | 'Pending' | 'Failed';
//   orderStatus: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
// }

// const initialOrders: Order[] = [
//   {
//     id: '1',
//     image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
//     name: 'Nike Air Max',
//     price: 129.99,
//     quantity: 2,
//     totalAmount: 259.98,
//     paymentStatus: 'Paid',
//     orderStatus: 'Processing'
//   },
//   {
//     id: '2',
//     image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
//     name: 'Smart Watch',
//     price: 199.99,
//     quantity: 1,
//     totalAmount: 199.99,
//     paymentStatus: 'Pending',
//     orderStatus: 'Processing'
//   },
//   {
//     id: '3',
//     image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12',
//     name: 'Wireless Headphones',
//     price: 89.99,
//     quantity: 3,
//     totalAmount: 269.97,
//     paymentStatus: 'Paid',
//     orderStatus: 'Shipped'
//   }
// ];

// const orderStatusOptions = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];

// function OrderPage() {
//   const [orders, setOrders] = useState<Order[]>(initialOrders);
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [editStatus, setEditStatus] = useState<string>('');

//   const handleEditClick = (order: Order) => {
//     setEditingId(order.id);
//     setEditStatus(order.orderStatus);
//   };

//   const handleStatusSave = (orderId: string) => {
//     setOrders(orders.map(order => 
//       order.id === orderId 
//         ? { ...order, orderStatus: editStatus as Order['orderStatus'] }
//         : order
//     ));
//     setEditingId(null);
//   };

//   const getStatusColor = (status: string) => {
//     const colors = {
//       Processing: 'bg-yellow-100 text-yellow-800',
//       Shipped: 'bg-blue-100 text-blue-800',
//       Delivered: 'bg-green-100 text-green-800',
//       Cancelled: 'bg-red-100 text-red-800',
//       Paid: 'bg-green-100 text-green-800',
//       Pending: 'bg-yellow-100 text-yellow-800',
//       Failed: 'bg-red-100 text-red-800'
//     };
//     return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Admin Orders</h1>
        
//         <div className="bg-white rounded-lg shadow overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200 table-auto">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Status</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {orders.map((order) => (
//                   <tr key={order.id} className="hover:bg-gray-50">
//                     <td className="px-4 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="h-12 w-12 flex-shrink-0">
//                           <img className="h-12 w-12 rounded-md object-cover" src={order.image} alt={order.name} />
//                         </div>
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-gray-900">{order.name}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-4 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">${order.price.toFixed(2)}</div>
//                     </td>
//                     <td className="px-4 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">{order.quantity}</div>
//                     </td>
//                     <td className="px-4 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">${order.totalAmount.toFixed(2)}</div>
//                     </td>
//                     <td className="px-4 py-4 whitespace-nowrap">
//                       <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.paymentStatus)}`}>
//                         {order.paymentStatus}
//                       </span>
//                     </td>
//                     <td className="px-4 py-4 whitespace-nowrap">
//                       {editingId === order.id ? (
//                         <select
//                           value={editStatus}
//                           onChange={(e) => setEditStatus(e.target.value)}
//                           className="text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                         >
//                           {orderStatusOptions.map((status) => (
//                             <option key={status} value={status}>{status}</option>
//                           ))}
//                         </select>
//                       ) : (
//                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.orderStatus)}`}>
//                           {order.orderStatus}
//                         </span>
//                       )}
//                     </td>
//                     <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {editingId === order.id ? (
//                         <div className="flex space-x-2">
//                           <button
//                             onClick={() => handleStatusSave(order.id)}
//                             className="text-green-600 hover:text-green-900"
//                           >
//                             <Check size={18} />
//                           </button>
//                           <button
//                             onClick={() => setEditingId(null)}
//                             className="text-red-600 hover:text-red-900"
//                           >
//                             <X size={18} />
//                           </button>
//                         </div>
//                       ) : (
//                         <button
//                           onClick={() => handleEditClick(order)}
//                           className="text-indigo-600 hover:text-indigo-900"
//                         >
//                           <Edit2 size={18} />
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default OrderPage;




import { useState } from "react"
import { ChevronDown, ChevronUp, Eye, MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample order data
const orders = [
  {
    id: "ORD-001",
    image: "/placeholder.svg?height=50&width=50",
    name: "Premium Headphones",
    price: 129.99,
    quantity: 1,
    total: 129.99,
    paymentStatus: "Paid",
    orderStatus: "Processing",
  },
  {
    id: "ORD-002",
    image: "/placeholder.svg?height=50&width=50",
    name: "Wireless Keyboard",
    price: 59.99,
    quantity: 2,
    total: 119.98,
    paymentStatus: "Paid",
    orderStatus: "Shipped",
  },
  {
    id: "ORD-003",
    image: "/placeholder.svg?height=50&width=50",
    name: "Smart Watch",
    price: 199.99,
    quantity: 1,
    total: 199.99,
    paymentStatus: "Pending",
    orderStatus: "Pending",
  },
  {
    id: "ORD-004",
    image: "/placeholder.svg?height=50&width=50",
    name: "Bluetooth Speaker",
    price: 79.99,
    quantity: 3,
    total: 239.97,
    paymentStatus: "Paid",
    orderStatus: "Delivered",
  },
  {
    id: "ORD-005",
    image: "/placeholder.svg?height=50&width=50",
    name: "USB-C Hub",
    price: 45.99,
    quantity: 1,
    total: 45.99,
    paymentStatus: "Failed",
    orderStatus: "Cancelled",
  },
]

export default function OrdersPage() {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const updateOrderStatus = (orderId: string, status: string) => {
    console.log(`Updating order ${orderId} status to ${status}`)
    // In a real app, you would update the order status in your database
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="mb-6 text-2xl font-bold text-slate-800">Order Management</h1>

      {/* Orders table */}
      <div className="rounded-lg border bg-white shadow">
        {/* Desktop table */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
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
                <TableRow key={order.id} className="hover:bg-slate-50">
                  <TableCell>
                    <img
                      src={order.image || "/placeholder.svg"}
                      alt={order.name}
                      width={50}
                      height={50}
                      className="rounded-md border object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{order.name}</TableCell>
                  <TableCell>${order.price.toFixed(2)}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        order.paymentStatus === "Paid"
                          ? "bg-green-100 text-green-800"
                          : order.paymentStatus === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }
                    >
                      {order.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Select
                      defaultValue={order.orderStatus}
                      onValueChange={(value) => updateOrderStatus(order.id, value)}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Processing">Processing</SelectItem>
                        <SelectItem value="Shipped">Shipped</SelectItem>
                        <SelectItem value="Delivered">Delivered</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit order</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Cancel order</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
                      src={order.image || "/placeholder.svg"}
                      alt={order.name}
                      width={40}
                      height={40}
                      className="rounded-md border object-cover"
                    />
                    <div>
                      <div className="font-medium">{order.name}</div>
                      <div className="text-sm text-slate-500">ID: {order.id}</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => toggleRow(order.id)}>
                    {expandedRows[order.id] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </div>

                {expandedRows[order.id] && (
                  <div className="mt-4 grid gap-2 text-sm">
                    <div className="grid grid-cols-2 gap-1">
                      <div className="text-slate-500">Price:</div>
                      <div>${order.price.toFixed(2)}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <div className="text-slate-500">Quantity:</div>
                      <div>{order.quantity}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <div className="text-slate-500">Total:</div>
                      <div className="font-medium">${order.total.toFixed(2)}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <div className="text-slate-500">Payment:</div>
                      <div>
                        <Badge
                          className={
                            order.paymentStatus === "Paid"
                              ? "bg-green-100 text-green-800"
                              : order.paymentStatus === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }
                        >
                          {order.paymentStatus}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <div className="text-slate-500">Status:</div>
                      <div>
                        <Select
                          defaultValue={order.orderStatus}
                          onValueChange={(value) => updateOrderStatus(order.id, value)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Processing">Processing</SelectItem>
                            <SelectItem value="Shipped">Shipped</SelectItem>
                            <SelectItem value="Delivered">Delivered</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-end space-x-2">
                      <Button size="sm" variant="outline" className="h-8">
                        <Eye className="mr-1 h-3 w-3" />
                        View
                      </Button>
                      <Button size="sm" variant="default" className="h-8 bg-slate-700 hover:bg-slate-800">
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
    </div>
  )
}
