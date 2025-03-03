import { useState } from "react"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock cart data
const initialCartItems = [
  {
    id: 1,
    name: "Nike Air Max 270 React",
    description:
      "Experience ultimate comfort and style with the Nike Air Max 270 React. This innovative design combines the best of Nike's technology with contemporary aesthetics for everyday wear.",
    image: "/placeholder.svg?height=200&width=200",
    price: 12999,
    discountPrice: 9999,
    quantity: 1,
  },
  {
    id: 2,
    name: "Premium Wireless Headphones",
    description:
      "High-quality wireless headphones with active noise cancellation and premium sound quality for an immersive listening experience with long battery life.",
    image: "/placeholder.svg?height=200&width=200",
    price: 24999,
    discountPrice: 19999,
    quantity: 1,
  },
  {
    id: 3,
    name: "Smart Fitness Watch",
    description:
      "Advanced fitness tracking with heart rate monitoring, sleep analysis, and workout tracking. Water-resistant and long battery life.",
    image: "/placeholder.svg?height=200&width=200",
    price: 15999,
    discountPrice: 12999,
    quantity: 1,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.2,
    },
  },
}

export function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  // Format price in Indian Rupees
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Calculate cart totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discountedTotal = cartItems.reduce((sum, item) => sum + item.discountPrice * item.quantity, 0)
  const totalSavings = subtotal - discountedTotal
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-3"
        >
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <Badge variant="secondary" className="rounded-full px-3 py-1">
            {totalItems} items
          </Badge>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {cartItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
              >
                <Card className="flex flex-col items-center justify-center p-12">
                  <ShoppingBag className="mb-4 h-12 w-12 text-muted-foreground" />
                  <h2 className="mb-2 text-xl font-semibold">Your cart is empty</h2>
                  <p className="mb-6 text-center text-muted-foreground">Add items to your cart to continue shopping</p>
                  <Button size="lg" className="min-w-[200px]">
                    Continue Shopping
                  </Button>
                </Card>
              </motion.div>
            ) : (
              <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {cartItems.map((item) => {
                    const discountPercentage = Math.round(((item.price - item.discountPrice) / item.price) * 100)

                    return (
                      <motion.div key={item.id} variants={itemVariants} exit="exit" layout>
                        <Card className="overflow-hidden p-4 transition-shadow hover:shadow-lg">
                          <div className="flex gap-4">
                            <div className="relative aspect-square h-24 overflow-hidden rounded-lg bg-zinc-50 sm:h-32">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="object-cover transition-transform duration-300 hover:scale-105"
                              />
                            </div>
                            <div className="flex flex-1 flex-col justify-between">
                              <div className="space-y-1">
                                <h3 className="font-semibold tracking-tight">{item.name}</h3>
                                <p className="line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-primary">{formatPrice(item.discountPrice)}</span>
                                  <span className="text-sm text-muted-foreground line-through">
                                    {formatPrice(item.price)}
                                  </span>
                                  <Badge variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-50">
                                    {discountPercentage}% OFF
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 rounded-full"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  >
                                    <Minus className="h-3 w-3" />
                                    <span className="sr-only">Decrease quantity</span>
                                  </Button>
                                  <motion.span
                                    key={item.quantity}
                                    initial={{ scale: 1.25 }}
                                    animate={{ scale: 1 }}
                                    className="min-w-[2rem] text-center font-medium"
                                  >
                                    {item.quantity}
                                  </motion.span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 rounded-full"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  >
                                    <Plus className="h-3 w-3" />
                                    <span className="sr-only">Increase quantity</span>
                                  </Button>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-full text-muted-foreground hover:bg-red-50 hover:text-red-600"
                                  onClick={() => removeItem(item.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Remove item</span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </motion.div>
            )}
          </div>

          {cartItems.length > 0 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">
              <Card className="overflow-hidden">
                <div className="bg-zinc-50 p-6">
                  <h2 className="text-lg font-semibold">Order Summary</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Total Savings</span>
                      <span>- {formatPrice(totalSavings)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-4 text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-primary">{formatPrice(discountedTotal)}</span>
                    </div>
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Proceed to Checkout
                    </Button>
                    <p className="text-center text-sm text-muted-foreground">Free shipping on all orders</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

