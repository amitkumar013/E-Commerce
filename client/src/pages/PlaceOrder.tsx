// import { useEffect, useState } from "react";
// import { useCart } from "@/context/cartContext";
// import { useAuth } from "@/context/authContext";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import toast from "react-hot-toast";
// import axios from "axios";

// export default function PlaceOrder() {
//   const { cart } = useCart();
//   const { auth } = useAuth();
//   const navigate = useNavigate();
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [shippingAddress, setShippingAddress]: any = useState({
//     name: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     zipCode: "",
//     country: "",
//   });
//   const [paymentMethod, setPaymentMethod] = useState("COD");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   useEffect(() => {
//     const total = cart.reduce((sum, item) => sum + item.discountPrice * item.quantity, 0);
//     setTotalAmount(total);
//   }, [cart]);

//   const handleAddressChange = (e: any) => {
//     setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
//   };

//   const handleConfirmOrder = async () => {
//     setLoading(true);
//     setError("");
//     setSuccessMessage("");

//     if (cart.length === 0) {
//       toast.error("Cart is empty. Add items before placing an order.");
//       setLoading(false);
//       return;
//     }

//     const orderData = {
//       orderItems: cart.map((item) => ({
//         product: item._id,
//         name: item.name,
//         quantity: item.quantity,
//         price: item.discountPrice,
//       })),
//       totalAmount,
//       shippingAddress,
//       paymentMethod,
//     };

//     try {
//       const URI = import.meta.env.VITE_BACKEND_URL;
//       const response = await axios.post(`${URI}/orders/place-order`, orderData, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${auth?.token}`,
//         },
//       });

//       setSuccessMessage("Order placed successfully!");
//       toast.success("Order placed successfully!");
//       //navigate(`/payment?orderId=${response.data.data._id}&paymentMethod=${paymentMethod}`);

//     } catch (error: any) {
//       toast.error(error.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mt-20 min-h-screen bg-gray-100 p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//       {/* Left Side - Shipping Address */}
//       <Card className="p-6 shadow-lg">
//         <h2 className="text-lg font-semibold">Shipping Address</h2>
//         <div className="mt-4 space-y-3">
//           {["name", "phone", "address", "city", "state", "zipCode", "country"].map((field) => (
//             <div key={field}>
//               <Label className="text-sm font-medium">{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
//               <Input name={field} value={shippingAddress[field]} onChange={handleAddressChange} />
//             </div>
//           ))}
//         </div>
//       </Card>

//       {/* Right Side - Order Details */}
//       <Card className="p-6 shadow-lg">
//         <h2 className="text-lg font-semibold">Order Details</h2>
//         <div className="mt-4 space-y-3">
//           {cart.map((item) => (
//             <div key={item._id} className="flex justify-between">
//               <span>{item.name} (x{item.quantity})</span>
//               <span>₹{item.discountPrice * item.quantity}</span>
//             </div>
//           ))}
//         </div>
//         <div className="mt-4 flex justify-between font-bold text-lg">
//           <span>Total Amount:</span>
//           <span>₹{totalAmount}</span>
//         </div>

//         {/* Payment Method Selection */}
//         <div className="mt-6">
//           <Label className="text-sm font-medium">Select Payment Method</Label>
//           <Select value={paymentMethod} onValueChange={(value) => setPaymentMethod(value)}>
//             <SelectTrigger className="w-full mt-2">
//               <SelectValue placeholder="Select Payment Method" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="COD">Cash on Delivery (COD)</SelectItem>
//               <SelectItem value="Online">Online Payment</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         {error && <p className="text-red-500 mt-3">{error}</p>}
//         {successMessage && <p className="text-green-500 mt-3">{successMessage}</p>}

//         <Button className="mt-6 w-full" onClick={handleConfirmOrder} disabled={loading}>
//           {loading ? "Placing Order..." : "Proceed to Payment"}
//         </Button>
//       </Card>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useCart } from "@/context/cartContext";
import { useAuth } from "@/context/authContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import axios from "axios";

export default function PlaceOrder() {
  const { cart } = useCart();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingAddress, setShippingAddress]: any = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const URI = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const total = cart.reduce(
      (sum, item) => sum + item.discountPrice * item.quantity,
      0
    );
    setTotalAmount(total);
  }, [cart]);

  const handleAddressChange = (e: any) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  //  COD Order Placement
  const handleCODOrder = async () => {
    setLoading(true);
    try {
      const orderData = {
        orderItems: cart.map((item) => ({
          product: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount,
        shippingAddress,
        paymentMethod: "COD",
      };

      await axios.post(`${URI}/api/v1/orders/cod-checkout`, orderData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      toast.success("Order placed successfully!");
      navigate("/orderconfirmation");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Order placement failed");
    } finally {
      setLoading(false);
    }
  };

  //  Online Payment with Razorpay
  const handleOnlinePayment = async () => {
    setLoading(true);
    try {
      const URI = import.meta.env.VITE_BACKEND_URL;
      const orderData = {
        orderItems: cart.map((item) => ({
          product: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount,
        shippingAddress,
        paymentMethod: "Online",
      };

      const { data } = await axios.post(
        `${URI}/api/v1/payments/razorpay-checkout`,
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      console.log("Checkout API Response:", data);
      console.log("Checkout API Order Data:", data.data.order);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: orderData.totalAmount * 100,
        currency: "INR",
        name: "Your Store",
        description: "Test Transaction",
        order_id: data.data.orderId,
        handler: async function (response: any) {
          console.log("Payment Success:", response);

          try {
            const paymentData = {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              orderItems: orderData.orderItems,
              totalAmount: orderData.totalAmount,
              shippingAddress: orderData.shippingAddress,
              paymentMethod: "Online",
              paymentStatus: "paid",
              orderStatus: "order placed",
            };

            const verifyResponse = await axios.post(
              `${URI}/api/v1/payments/verify-payment`,
              paymentData,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${auth?.token}`,
                },
              }
            );
            if (verifyResponse.data.success) {
              console.log("Payment verified successfully!");
              toast.success("Payment Successful");
              navigate("/order-success");
            } else {
              console.error("❌ Payment failed", verifyResponse.data.message);
              toast.error("Payment failed! Try again");
            }
          } catch (error: any) {
            console.error(
              "❌ Payment verification failed",
              error.response?.data
            );
            toast.error(
              error.response?.data?.message || "Payment verification failed"
            );
          }
        },
        prefill: {
          name: shippingAddress.name,
          email: auth?.user?.email || "test@example.com",
          contact: shippingAddress.phone || "9000090000",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Payment initiation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-20 min-h-screen bg-gray-100 p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Side - Shipping Address */}
      <Card className="p-6 shadow-lg">
        <h2 className="text-lg font-semibold">Shipping Address</h2>
        <div className="mt-4 space-y-3">
          {[
            "name",
            "phone",
            "address",
            "city",
            "state",
            "zipCode",
            "country",
          ].map((field) => (
            <div key={field}>
              <Label className="text-sm font-medium">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </Label>
              <Input
                name={field}
                value={shippingAddress[field]}
                onChange={handleAddressChange}
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Right Side - Order Details */}
      <Card className="p-6 shadow-lg">
        <h2 className="text-lg font-semibold">Order Details</h2>
        <div className="mt-4 space-y-3">
          {cart.map((item) => (
            <div key={item._id} className="flex justify-between">
              <span>
                {item.name} (x{item.quantity})
              </span>
              <span>₹{item.discountPrice * item.quantity}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between font-bold text-lg">
          <span>Total Amount:</span>
          <span>₹{totalAmount}</span>
        </div>

        {/* Payment Method Selection */}
        <div className="mt-6">
          <Label className="text-sm font-medium">Select Payment Method</Label>
          <Select
            value={paymentMethod}
            onValueChange={(value) => setPaymentMethod(value)}
          >
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="Select Payment Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="COD">Cash on Delivery (COD)</SelectItem>
              <SelectItem value="Online">Online Payment</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          className="mt-6 w-full"
          onClick={
            paymentMethod === "COD" ? handleCODOrder : handleOnlinePayment
          }
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : paymentMethod === "COD"
            ? "Place COD Order"
            : "Proceed to Payment"}
        </Button>
      </Card>
    </div>
  );
}
