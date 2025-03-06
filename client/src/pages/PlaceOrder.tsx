// import type React from "react";
// import { useState } from "react";
// import { motion } from "framer-motion";
// import { ArrowRight, CheckCircle, Package, Truck } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import toast from "react-hot-toast";
// import axios from "axios";

// export default function PlaceOrder() {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isComplete, setIsComplete] = useState(false);
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [zipCode, setZipCode] = useState("");
//   const [country, setCountry] = useState("");

//   const authData = localStorage.getItem("auth");
//   const parsedAuth = authData ? JSON.parse(authData) : null;
//   const token = parsedAuth?.data?.token;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       const URI = import.meta.env.VITE_BACKEND_URL;
//       const res = await axios.post(
//         `${URI}/orders/place-order`,
//         { name, phone, address, city, state, zipCode, country},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (res && res.data.success) {
//         setIsComplete(true);
//         setName("");
//         setPhone("");
//         setAddress("");
//         setCity("");
//         setState("");
//         setZipCode("");
//         setCountry("");
//         toast.success("Order placed successfully");
//         setTimeout(() => {
//             setIsSubmitting(false)
//             setIsComplete(true)
//           }, 1500)
//       } else {
//         toast.error("Order failed");
//       }
//     } catch (error) {
//         toast.error("Order failed");
//     }

//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { type: "spring", stiffness: 100 },
//     },
//   };

//   const orderItems = [
//     { name: "Premium Headphones", price: 9999, quantity: 1 },
//     //{ name: "Wireless Keyboard", price: 4499, quantity: 1 },
//     //{ name: "USB-C Cable (2m)", price: 999, quantity: 2 },
//   ];

//   const subtotal = orderItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );
//   const shipping = 499;
//   const tax = subtotal * 0.18;
//   const total = subtotal + shipping + tax;

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-6xl">
//       {isComplete ? (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="flex flex-col items-center justify-center text-center py-12"
//         >
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
//           >
//             <CheckCircle className="h-24 w-24 text-primary mb-6" />
//           </motion.div>
//           <h1 className="text-3xl font-bold mb-2">
//             Order Placed Successfully!
//           </h1>
//           <p className="text-muted-foreground mb-6 max-w-md">
//             Thank you for your order. You will receive a confirmation email
//             shortly with your order details.
//           </p>
//           <Button variant="default">View Order Details</Button>
//         </motion.div>
//       ) : (
//         <>
//           <motion.h1
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-3xl font-bold mb-8 text-center md:text-left"
//           >
//             Complete Your Order
//           </motion.h1>

//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="grid grid-cols-1 md:grid-cols-2 gap-8"
//           >
//             {/* Left Side - Shipping Address */}
//             <motion.div variants={itemVariants}>
//               <Card className="h-full">
//                 <CardHeader>
//                   <div className="flex items-center gap-2 mb-2">
//                     <Truck className="h-5 w-5 text-primary" />
//                     <CardTitle>SHIPPING ADDRESS</CardTitle>
//                   </div>
//                   <CardDescription>
//                     Enter your shipping details to complete your order
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <form className="space-y-4" onSubmit={handleSubmit}>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <Label htmlFor="name">Name</Label>
//                         <Input
//                           id="name"
//                           placeholder="Rahul kplatha"
//                           value={name}
//                           onChange={(e) => setName(e.target.value)}
//                           required
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="phone">Phone Number</Label>
//                         <Input
//                           id="phone"
//                           type="tel"
//                           value={phone}
//                           onChange={(e) => setPhone(e.target.value)}
//                           placeholder="9876543210"
//                           required
//                         />
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="address">Street Address</Label>
//                       <Input
//                         id="address"
//                         placeholder="123 MG Road"
//                         value={address}
//                         onChange={(e) => setAddress(e.target.value)}
//                         required
//                       />
//                     </div>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <Label htmlFor="city">City</Label>
//                         <Input
//                           id="city"
//                           placeholder="Bangalore"
//                           value={city}
//                           onChange={(e) => setCity(e.target.value)}
//                           required
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="state">State</Label>
//                         <Select>
//                           <SelectTrigger id="state">
//                             <SelectValue placeholder="Select state" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="ka">Karnataka</SelectItem>
//                             <SelectItem value="mh">Maharashtra</SelectItem>
//                             <SelectItem value="dl">Delhi</SelectItem>
//                             <SelectItem value="tn">Tamil Nadu</SelectItem>
//                             <SelectItem value="up">Uttar Pradesh</SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <Label htmlFor="zipCode">PIN Code</Label>
//                         <Input
//                           id="zipCode"
//                           placeholder="560001"
//                           value={zipCode}
//                           onChange={(e) => setZipCode(e.target.value)}
//                           required
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="country">Country</Label>
//                         <Select defaultValue="in">
//                           <SelectTrigger id="country">
//                             <SelectValue placeholder="Select country" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="in">India</SelectItem>
//                             <SelectItem value="us">United States</SelectItem>
//                             <SelectItem value="uk">United Kingdom</SelectItem>
//                             <SelectItem value="sg">Singapore</SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </div>
//                     </div>
//                   </form>
//                 </CardContent>
//               </Card>
//             </motion.div>

//             {/* Right Side - Order Summary */}
//             <motion.div variants={itemVariants}>
//               <Card className="h-full">
//                 <CardHeader>
//                   <div className="flex items-center gap-2 mb-2">
//                     <Package className="h-5 w-5 text-primary" />
//                     <CardTitle>PRICE DETAILS</CardTitle>
//                   </div>
//                   <CardDescription>
//                     Review your order before placing it
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     {orderItems.map((item, index) => (
//                       <motion.div
//                         key={index}
//                         initial={{ opacity: 0, x: 20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: 0.1 * index }}
//                         className="flex justify-between"
//                       >
//                         <div>
//                           <p className="font-medium">{item.name}</p>
//                           <p className="text-sm text-muted-foreground">
//                             Qty: {item.quantity}
//                           </p>
//                         </div>
//                         <p className="font-medium">
//                           ₹{(item.price * item.quantity).toFixed(2)}
//                         </p>
//                       </motion.div>
//                     ))}

//                     <Separator className="my-4" />

//                     <div className="space-y-2">
//                       <div className="flex justify-between">
//                         <p className="text-muted-foreground">Subtotal</p>
//                         <p>₹{subtotal.toFixed(2)}</p>
//                       </div>
//                       <div className="flex justify-between">
//                         <p className="text-muted-foreground">Shipping</p>
//                         <p>₹{shipping.toFixed(2)}</p>
//                       </div>
//                       <div className="flex justify-between">
//                         <p className="text-muted-foreground">GST (18%)</p>
//                         <p>₹{tax.toFixed(2)}</p>
//                       </div>
//                     </div>

//                     <Separator className="my-4" />

//                     <div className="flex justify-between">
//                       <p className="text-lg font-bold">Total</p>
//                       <p className="text-lg font-bold">₹{total.toFixed(2)}</p>
//                     </div>
//                   </div>
//                 </CardContent>

//                 <CardFooter>
//                   <Button
//                     className="w-full group bg-primary hover:bg-primary/90 text-primary-foreground"
//                     size="lg"
//                     onClick={handleSubmit}
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? (
//                       <span className="flex items-center">
//                         <svg
//                           className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                         >
//                           <circle
//                             className="opacity-25"
//                             cx="12"
//                             cy="12"
//                             r="10"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                           ></circle>
//                           <path
//                             className="opacity-75"
//                             fill="currentColor"
//                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                           ></path>
//                         </svg>
//                         Processing...
//                       </span>
//                     ) : (
//                       <span className="flex items-center">
//                         Place Order
//                         <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
//                       </span>
//                     )}
//                   </Button>
//                 </CardFooter>
//               </Card>
//             </motion.div>
//           </motion.div>
//         </>
//       )}
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  const [paymentMethod, setPaymentMethod] = useState("COD"); // Default Payment Method
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.discountPrice * item.quantity, 0);
    setTotalAmount(total);
  }, [cart]);

  const handleAddressChange = (e: any) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handleConfirmOrder = async () => {
    setLoading(true);
    setError("");
    setSuccessMessage("");

    if (cart.length === 0) {
      toast.error("Cart is empty. Add items before placing an order.");
      setLoading(false);
      return;
    }

    const orderData = {
      orderItems: cart.map((item) => ({
        product: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.discountPrice,
      })),
      totalAmount,
      shippingAddress,
      paymentMethod, // ✅ Add Payment Method in Order Data
    };

    try {
      const URI = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(`${URI}/orders/place-order`, orderData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      setSuccessMessage("Order placed successfully!");
      toast.success("Order placed successfully!");
      navigate(`/payment?orderId=${response.data.data._id}&paymentMethod=${paymentMethod}`);

    } catch (error: any) {
      setError(error.response?.data?.message || "Something went wrong");
      toast.error(error.response?.data?.message || "Something went wrong");
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
          {["name", "phone", "address", "city", "state", "zipCode", "country"].map((field) => (
            <div key={field}>
              <Label className="text-sm font-medium">{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
              <Input name={field} value={shippingAddress[field]} onChange={handleAddressChange} />
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
              <span>{item.name} (x{item.quantity})</span>
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
          <Select value={paymentMethod} onValueChange={(value) => setPaymentMethod(value)}>
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="Select Payment Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="COD">Cash on Delivery (COD)</SelectItem>
              <SelectItem value="Online">Online Payment</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {error && <p className="text-red-500 mt-3">{error}</p>}
        {successMessage && <p className="text-green-500 mt-3">{successMessage}</p>}

        <Button className="mt-6 w-full" onClick={handleConfirmOrder} disabled={loading}>
          {loading ? "Placing Order..." : "Proceed to Payment"}
        </Button>
      </Card>
    </div>
  );
}
 