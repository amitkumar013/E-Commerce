import { useState } from "react"
import { Trash2, ShoppingBag, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Link } from "react-router-dom"
 
interface WishlistItem {
  id: string
  name: string
  image: string
  price: number
  discountPrice: number
  discountPercentage: number
}

export default function WishlistPage() {
 
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: "1",
      name: "Premium Wireless Headphones",
      image: "/placeholder.svg?height=120&width=120",
      price: 199.99,
      discountPrice: 149.99,
      discountPercentage: 25,
    },
    {
      id: "2",
      name: "Ergonomic Office Chair",
      image: "/placeholder.svg?height=120&width=120",
      price: 299.99,
      discountPrice: 249.99,
      discountPercentage: 17,
    },
    {
      id: "3",
      name: "Smart Fitness Watch",
      image: "/placeholder.svg?height=120&width=120",
      price: 149.99,
      discountPrice: 129.99,
      discountPercentage: 13,
    },
    // Uncomment to see empty state
    // []
  ])

  const handleRemoveItem = (id: string) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id))
  }

  return (
    <div className="mt-16 container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800">My Wishlist</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"}
          </p>
        </div>
        <Button className="mt-4 md:mt-0 bg-teal-600 text-white hover:bg-teal-700" asChild>
          <Link to="/products">
            Continue Shopping
            <ShoppingBag className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {wishlistItems.length > 0 ? (
        <div className="grid gap-4">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="p-4 shadow-md border border-slate-200">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-shrink-0">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="font-medium text-base sm:text-lg truncate text-slate-900">{item.name}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1">
                    <div className="flex items-center">
                      <span className="font-semibold text-teal-600">${item.discountPrice.toFixed(2)}</span>
                      <span className="text-muted-foreground line-through text-sm ml-2">${item.price.toFixed(2)}</span>
                    </div>
                    <span className="text-sm font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded">
                      {item.discountPercentage}% OFF
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-500 hover:text-red-600 hover:bg-red-100"
                    onClick={() => handleRemoveItem(item.id)}
                    aria-label={`Remove ${item.name} from wishlist`}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          <div className="flex flex-col sm:flex-row justify-end mt-4 gap-2">
            <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
              Add All to Cart
            </Button>
            <Button variant="destructive" className="bg-red-600 text-white hover:bg-red-700" onClick={() => setWishlistItems([])}>
              Clear Wishlist
            </Button>
          </div>
        </div>
      ) : (
        <Card className="text-center p-8 md:p-12 shadow-md border border-slate-200">
          <div className="flex flex-col items-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-teal-600" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-2 text-slate-800">Your Wishlist is Empty</h2>
            <p className="text-sm md:text-base text-muted-foreground mb-6">
              Save items you love to your wishlist. Review them anytime and easily move them to your cart.
            </p>
            <Link to="/products">
              <Button className="px-8 bg-teal-600 text-white hover:bg-teal-700">Discover Products</Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  )
}

