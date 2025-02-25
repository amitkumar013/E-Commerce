import { useState } from "react"
import { Star, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Mock product data
const product = {
  brand: "Nike",
  name: "Air Max 270 React",
  images: [
    "https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/0/5/v/-original-imah852p49aespx7.jpeg?q=70",
    "https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/a/m/z/-original-imah4er9hdvzzcyr.jpeg?q=70",
    "https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/t/2/t/-original-imah4erjqdpysrcu.jpeg?q=70",
    "https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/n/u/k/-original-imagx8guubhhmny8.jpeg?q=70",
  ],
  price: 12999,
  discountPrice: 9999,
  rating: 4.5,
  totalReviews: 128,
  colors: ["Black", "White", "Blue", "Red"],
  sizes: [
    { value: "UK 6", inStock: true },
    { value: "UK 7", inStock: true },
    { value: "UK 8", inStock: true },
    { value: "UK 9", inStock: false },
    { value: "UK 10", inStock: true },
  ],
  sellerName: "SportStyle Store",
  description: "Premium comfort and style combined in this innovative design.",
}

const similarProducts = Array(6).fill({
  image: "/placeholder.svg?height=300&width=300",
  name: "Similar Product",
  price: 8999,
  discountPrice: 7499,
  rating: 4.2,
})

export function ProductDetails() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[0].value)
  const [liked, setLiked] = useState(false)

  const discountPercentage = Math.round(((product.price - product.discountPrice) / product.price) * 100)

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Left: Image Gallery */}
        <div className="space-y-4">
          <div className="group relative aspect-square overflow-hidden rounded-lg border bg-muted">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <Button
              variant="secondary"
              size="icon"
              className={cn(
                "absolute right-4 top-4 z-10 transition-all duration-300",
                liked ? "text-red-500 hover:text-red-600" : "hover:text-red-500",
              )}
              onClick={() => setLiked(!liked)}
            >
              <Heart className={cn("h-5 w-5", liked && "fill-current")} />
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={cn(
                  "group relative aspect-square overflow-hidden rounded-lg border bg-muted transition-all duration-200",
                  selectedImage === index
                    ? "ring-2 ring-primary ring-offset-2"
                    : "hover:ring-2 hover:ring-primary/50 hover:ring-offset-2",
                )}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Product ${index + 1}`}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </button>
            ))}
          </div>
        </div>
        {/* Right: Product Info */}
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-lg font-semibold text-primary">{product.brand}</p>
            <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5 transition-colors duration-200",
                      i < Math.floor(product.rating) ? "fill-primary text-primary" : "fill-muted text-muted-foreground",
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.totalReviews} reviews)</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-primary">{formatPrice(product.discountPrice)}</span>
              <span className="text-lg text-muted-foreground line-through">{formatPrice(product.price)}</span>
              <Badge variant="secondary" className="ml-2">
                {discountPercentage}% OFF
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">Inclusive of all taxes</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Color</Label>
              <RadioGroup defaultValue={selectedColor} onValueChange={setSelectedColor} className="flex gap-2">
                {product.colors.map((color) => (
                  <div key={color} className="flex items-center space-x-2">
                    <RadioGroupItem value={color} id={`color-${color}`} />
                    <Label htmlFor={`color-${color}`}>{color}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label className="text-base">Size</Label>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size.value}
                    onClick={() => size.inStock && setSelectedSize(size.value)}
                    disabled={!size.inStock}
                    className={cn(
                      "relative h-12 rounded-lg border text-sm font-medium transition-all duration-200",
                      size.inStock ? "hover:border-primary hover:bg-primary/5" : "cursor-not-allowed opacity-50",
                      selectedSize === size.value && size.inStock && "border-primary bg-primary/10",
                    )}
                  >
                    {size.value}
                    {!size.inStock && (
                      <div className="absolute inset-x-0 top-1/2 h-px -rotate-45 bg-muted-foreground/50" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2 rounded-lg bg-muted/50 p-4 backdrop-blur-sm">
            <p className="text-sm font-medium">Seller</p>
            <p className="text-sm text-muted-foreground">{product.sellerName}</p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button className="flex-1 text-base transition-transform active:scale-95" variant="outline">
              Add to Cart
            </Button>
            <Button className="flex-1 text-base transition-transform active:scale-95">Buy Now</Button>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      <section className="mt-16 space-y-4">
        <h2 className="text-2xl font-bold">Similar Products</h2>
        <div className="relative">
          <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-4">
            {similarProducts.map((product, index) => (
              <Card
                key={index}
                className="min-w-[250px] flex-none transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <CardContent className="p-4">
                  <div className="relative mb-3 aspect-square overflow-hidden rounded-lg bg-muted">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="font-bold text-primary">{formatPrice(product.discountPrice)}</span>
                    <span className="text-sm text-muted-foreground line-through">{formatPrice(product.price)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
