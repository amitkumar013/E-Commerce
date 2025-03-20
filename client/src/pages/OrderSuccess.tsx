import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { CheckCircle, ChevronRight, Home, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function OrderSuccess() {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5)
    const orderId = "ORD12345678"

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          navigate("/");
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse" as const,
        duration: 1.5,
      },
    },
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-md min-h-[80vh] flex items-center justify-center">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full">
        {/* Success Message */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <motion.div variants={pulseVariants} animate="pulse" className="bg-primary/10 rounded-full p-4">
              <CheckCircle className="h-20 w-20 text-primary" />
            </motion.div>
          </motion.div>
          <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
          <p className="text-muted-foreground mb-2">
            Thank you for your order. We've received your order and will begin processing it soon.
          </p>
          <p className="text-sm font-medium mb-4">
            Order ID: <span className="text-primary">{orderId}</span>
          </p>
          <motion.div variants={itemVariants} className="text-sm font-medium text-primary">
            Redirecting to home page in {countdown} seconds...
          </motion.div>
        </motion.div>

        {/* Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground group"
            onClick={() => navigate("/")}
          >
            <Home className="mr-2 h-4 w-4" />
            Go to Home
          </Button>
          <Button
            variant="outline"
            className="border-primary/20 text-primary hover:bg-primary/5 group"
            onClick={() => navigate("/order-detail")}
          >
            View Order Details
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>

        {/* Estimated Delivery */}
        <motion.div variants={itemVariants} className="mt-8">
          <Card className="border-primary/10">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <div className="bg-primary/10 p-3 rounded-full">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Package className="h-8 w-8 text-primary" />
                  </motion.div>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Estimated Delivery</h3>
                  <p className="text-muted-foreground">Your order is expected to arrive within 3-5 business days.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}

