// import { useEffect, useState } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import { useAuth } from "@/context/authContext";
// import { Button } from "@/components/ui/button";
// import axios from "axios";
// import toast from "react-hot-toast";

// export default function Payment() {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const { auth } = useAuth();
//   const [loading, setLoading] = useState(false);

//   const orderId = searchParams.get("orderId");
//   const paymentMethod = searchParams.get("paymentMethod");

//   useEffect(() => {
//     if (!orderId || !paymentMethod) {
//       toast.error("Invalid payment request");
//       navigate("/"); // Redirect to Home if payment details are missing
//     } else if (paymentMethod === "Online") {
//       handleOnlinePayment();
//     }
//   }, [orderId, paymentMethod]);

//   const handleOnlinePayment = async () => {
//     setLoading(true);
//     try {
//       const URI = import.meta.env.VITE_BACKEND_URL;

//       // 🔹 Create Razorpay Order
//       const { data } = await axios.post(
//         `${URI}/orders/create-razorpay-order`,
//         { orderId },
//         {
//           headers: {
//             Authorization: `Bearer ${auth?.token}`,
//           },
//         }
//       );

//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//         amount: data.data.amount,
//         currency: data.data.currency,
//         order_id: data.data.id,
//         name: "E-Commerce",
//         description: "Order Payment",
//         handler: async function (response: any) {
//           try {
//             // 🔹 Verify Payment
//             await axios.post(
//               `${URI}/orders/verify-payment`,
//               {
//                 orderId,
//                 paymentId: response.razorpay_payment_id,
//                 signature: response.razorpay_signature,
//               },
//               {
//                 headers: {
//                   Authorization: `Bearer ${auth?.token}`,
//                 },
//               }
//             );

//             toast.success("Payment successful!");
//             navigate("/order-success");
//           } catch (error: any) {
//             toast.error(error.response?.data?.message || "Payment verification failed");
//           }
//         },
//         prefill: {
//           email: auth?.user?.email || "",
//           contact: auth?.user?.phone || "",
//         },
//         theme: { color: "#3399cc" },
//       };

//       const razorpay = new (window as any).Razorpay(options);
//       razorpay.open();
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || "Error processing payment");
//       navigate("/checkout");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCODPayment = () => {
//     toast.success("Order placed successfully with COD!");
//     navigate("/order-success");
//   };

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center">
//       {paymentMethod === "COD" ? (
//         <>
//           <h2 className="text-2xl font-semibold">Confirm COD Order</h2>
//           <Button className="mt-4" onClick={handleCODPayment} disabled={loading}>
//             {loading ? "Processing..." : "Confirm Order"}
//           </Button>
//         </>
//       ) : (
//         <h2 className="text-2xl font-semibold">Processing Online Payment...</h2>
//       )}
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import { useAuth } from "@/context/authContext";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { Button } from "@/components/ui/button";

// // Define Razorpay interface
// interface RazorpayOptions {
//   key: string;
//   amount: number;
//   currency: string;
//   name: string;
//   description: string;
//   order_id: string;
//   handler: (response: RazorpayPaymentResponse) => void;
//   prefill: {
//     email: string;
//     contact: string;
//   };
//   theme: {
//     color: string;
//   };
// }

// // Define payment response interface
// interface RazorpayPaymentResponse {
//   razorpay_order_id: string;
//   razorpay_payment_id: string;
//   razorpay_signature: string;
// }

// export default function PaymentPage() {
//   const { auth } = useAuth();
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState<boolean>(false);

//   const orderId = searchParams.get("orderId") || "";
//   const paymentMethod = searchParams.get("paymentMethod") || "";

//   useEffect(() => {
//     if (paymentMethod === "COD") {
//       toast.success("Order placed successfully via COD!");
//       navigate("/orders"); // Redirect to orders page
//     } else {
//       handleOnlinePayment();
//     }
//   }, []);

//   const handleOnlinePayment = async () => {
//     setLoading(true);
//     try {
//       const URI = import.meta.env.VITE_BACKEND_URL;

//       // Step 1: Get Razorpay Order Details from Backend
//       const { data } = await axios.post(`${URI}/payments/checkout-order`, { orderId }, {
//         headers: { Authorization: `Bearer ${auth?.token}` },
//       });

//       if (!data.razorpayOrder) {
//         throw new Error("Failed to initiate payment");
//       }

//       const { razorpayOrder } = data;

//       // Step 2: Initialize Razorpay Payment
//       const options: RazorpayOptions = {
//         key: import.meta.env.VITE_RAZORPAY_KEY_ID as string,
//         amount: razorpayOrder.amount,
//         currency: "INR",
//         name: "E-Commerce",
//         description: "Order Payment",
//         order_id: razorpayOrder.id,
//         handler: async function (response: RazorpayPaymentResponse) {
//           // Step 3: Verify Payment
//           await verifyPayment(response);
//         },
//         prefill: {
//           email: auth?.user?.email || "test@example.com",
//           contact: auth?.user?.phone || "9999999999",
//         },
//         theme: { color: "#3399cc" },
//       };

//       const razor = new (window as any).Razorpay(options);
//       razor.open();
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || "Payment failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const verifyPayment = async (paymentData: RazorpayPaymentResponse) => {
//     try {
//       const URI = import.meta.env.VITE_BACKEND_URL;
//       const response = await axios.post(`${URI}/payments/verify-payment`, paymentData, {
//         headers: { Authorization: `Bearer ${auth?.token}` },
//       });

//       if (response.data.success) {
//         toast.success("Payment successful!");
//         navigate("/orders");
//       }
//     } catch (error: any) {
//       toast.error("Payment verification failed");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       {loading ? (
//         <p>Processing Payment...</p>
//       ) : (
//         <Button onClick={handleOnlinePayment} disabled={loading}>
//           Pay Now
//         </Button>
//       )}
//     </div>
//   );
// }
