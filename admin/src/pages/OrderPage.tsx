import { useState } from 'react';
import { Edit2, Check, X } from 'lucide-react';

interface Order {
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
  totalAmount: number;
  paymentStatus: 'Paid' | 'Pending' | 'Failed';
  orderStatus: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}

const initialOrders: Order[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    name: 'Nike Air Max',
    price: 129.99,
    quantity: 2,
    totalAmount: 259.98,
    paymentStatus: 'Paid',
    orderStatus: 'Processing'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    name: 'Smart Watch',
    price: 199.99,
    quantity: 1,
    totalAmount: 199.99,
    paymentStatus: 'Pending',
    orderStatus: 'Processing'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12',
    name: 'Wireless Headphones',
    price: 89.99,
    quantity: 3,
    totalAmount: 269.97,
    paymentStatus: 'Paid',
    orderStatus: 'Shipped'
  }
];

const orderStatusOptions = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];

function OrderPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState<string>('');

  const handleEditClick = (order: Order) => {
    setEditingId(order.id);
    setEditStatus(order.orderStatus);
  };

  const handleStatusSave = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, orderStatus: editStatus as Order['orderStatus'] }
        : order
    ));
    setEditingId(null);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      Processing: 'bg-yellow-100 text-yellow-800',
      Shipped: 'bg-blue-100 text-blue-800',
      Delivered: 'bg-green-100 text-green-800',
      Cancelled: 'bg-red-100 text-red-800',
      Paid: 'bg-green-100 text-green-800',
      Pending: 'bg-yellow-100 text-yellow-800',
      Failed: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Admin Orders</h1>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-16 w-16 flex-shrink-0">
                          <img className="h-16 w-16 rounded-md object-cover" src={order.image} alt={order.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{order.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${order.price.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.quantity}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${order.totalAmount.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === order.id ? (
                        <select
                          value={editStatus}
                          onChange={(e) => setEditStatus(e.target.value)}
                          className="text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                          {orderStatusOptions.map((status) => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      ) : (
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.orderStatus)}`}>
                          {order.orderStatus}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {editingId === order.id ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleStatusSave(order.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Check size={18} />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleEditClick(order)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit2 size={18} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;