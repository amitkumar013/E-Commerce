import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Link } from "react-router-dom"

export default function DealsPage() {
  // Sample deals data
  const featuredDeal = {
    title: "Summer Sale",
    description: "Up to 50% off on selected summer items. Limited time only!",
    image: "/placeholder.svg?height=600&width=1200",
    expiryDate: "July 31, 2025",
    code: "SUMMER50",
  }

  const deals = [
    {
      id: 1,
      title: "New Arrivals",
      description: "20% off on all new arrivals. Use code NEW20 at checkout.",
      image: "/placeholder.svg?height=400&width=600",
      expiryDate: "June 15, 2025",
      code: "NEW20",
      category: "discount",
    },
    {
      id: 2,
      title: "Accessories Bundle",
      description: "Buy any 2 accessories and get the 3rd one free.",
      image: "/placeholder.svg?height=400&width=600",
      expiryDate: "June 30, 2025",
      code: "BUNDLE3",
      category: "bundle",
    },
    {
      id: 3,
      title: "Free Shipping",
      description: "Free shipping on all orders over $50.",
      image: "/placeholder.svg?height=400&width=600",
      expiryDate: "Ongoing",
      code: "SHIP50",
      category: "shipping",
    },
    {
      id: 4,
      title: "Clearance Sale",
      description: "Up to 70% off on clearance items. While supplies last.",
      image: "/placeholder.svg?height=400&width=600",
      expiryDate: "Until stock lasts",
      code: "CLEAR70",
      category: "discount",
    },
    {
      id: 5,
      title: "Loyalty Reward",
      description: "Earn double points on all purchases this month.",
      image: "/placeholder.svg?height=400&width=600",
      expiryDate: "End of month",
      code: "LOYAL2X",
      category: "loyalty",
    },
    {
      id: 6,
      title: "Weekend Flash Sale",
      description: "30% off on selected items every weekend.",
      image: "/placeholder.svg?height=400&width=600",
      expiryDate: "Every weekend",
      code: "WEEKEND30",
      category: "discount",
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-muted py-20 md:py-28">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Deals & Promotions</h1>
            <p className="text-xl text-muted-foreground">
              Discover our latest offers, discounts, and special promotions.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Deal */}
      <section className="py-8 md:py-12 px-6">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Featured Deal</h2>
          <div className="relative overflow-hidden rounded-lg">
            <div className="absolute inset-0">
              <img
                src={featuredDeal.image || "/placeholder.svg"}
                alt={featuredDeal.title}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
            </div>
            <div className="relative z-10 p-8 md:p-12 lg:p-16 text-white">
              <div className="max-w-2xl">
                <Badge className="bg-primary text-primary-foreground mb-4">Limited Time Offer</Badge>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">{featuredDeal.title}</h3>
                <p className="text-lg mb-6">{featuredDeal.description}</p>
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg inline-block mb-6">
                  <p className="text-sm mb-1">Use code at checkout:</p>
                  <p className="text-2xl font-bold">{featuredDeal.code}</p>
                </div>
                <p className="mb-6">Expires: {featuredDeal.expiryDate}</p>
                <Button size="lg" className="bg-white text-black hover:bg-white/90">
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Deals */}
      <section className="py-8 md:py-12 px-6 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Current Promotions</h2>

          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-5">
              <TabsTrigger value="all">All Deals</TabsTrigger>
              <TabsTrigger value="discount">Discounts</TabsTrigger>
              <TabsTrigger value="bundle">Bundles</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
              <TabsTrigger value="loyalty">Loyalty</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {deals.map((deal) => (
                  <DealCard key={deal.id} deal={deal} />
                ))}
              </div>
            </TabsContent>

            {["discount", "bundle", "shipping", "loyalty"].map((category) => (
              <TabsContent key={category} value={category} className="mt-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {deals
                    .filter((deal) => deal.category === category)
                    .map((deal) => (
                      <DealCard key={deal.id} deal={deal} />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* How to Redeem */}
      <section className="py-8 md:py-12 px-6">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">How to Redeem</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Browse Deals</h3>
              <p className="text-muted-foreground">
                Explore our current promotions and find the ones that interest you.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Copy Code</h3>
              <p className="text-muted-foreground">Copy the promotion code for the deal you want to use.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Shop Products</h3>
              <p className="text-muted-foreground">Add your favorite items to your shopping cart.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Apply at Checkout</h3>
              <p className="text-muted-foreground">Enter the promotion code during checkout to apply the discount.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-8 md:py-12 px-6 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Get Exclusive Deals</h2>
            <p className="mb-6">
              Subscribe to our newsletter and be the first to know about our special offers and promotions.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
              />
              <Button type="submit" variant="secondary">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

// Deal Card Component
function DealCard({ deal }: { deal: any }) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48">
        <img src={deal.image || "/placeholder.svg"} alt={deal.title} className="object-cover" />
        <div className="absolute top-2 right-2">
          <Badge className="bg-primary text-primary-foreground">
            {deal.category.charAt(0).toUpperCase() + deal.category.slice(1)}
          </Badge>
        </div>
      </div>
      <CardContent className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2">{deal.title}</h3>
        <p className="text-muted-foreground mb-4 flex-grow">{deal.description}</p>
        <div className="space-y-4">
          <div className="bg-muted p-3 rounded-md text-center">
            <p className="text-sm mb-1">Promo Code:</p>
            <p className="text-lg font-bold">{deal.code}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Expires: {deal.expiryDate}</p>
            <Button variant="outline" size="sm" asChild>
              <Link to="/">Shop Now</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
