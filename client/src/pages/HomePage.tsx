import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { HomeProductCard } from "@/components/HomeProductCard";
import { AutoCarousel } from "@/components/AutoCarousel";

const categories = ["Best Sellers", "Trending", "Shoes", "Saree", "Mobile"];

const products = {
  "Best Sellers": [
    {
      image: "/placeholder.svg?height=300&width=300",
      name: "Premium Wireless Headphone",
      price: 299,
      discountPrice: 249,
      discountPercentage: 40,
      stock: "In Stock",
      delivery: "Free delivery",
      category: "Best Sellers",
    },
    // Add more products...
  ],
  Trending: [
    {
      image: "/placeholder.svg?height=300&width=300",
      name: "Smart Watch Pro",
      price: 199,
      discountPrice: 179,
      discountPercentage: 50,
      delivery: "Free delivery", 
      stock: "In Stock",
      category: "Trending",
    },
  ],
  Shoes: [
    {
      image: "/placeholder.svg?height=300&width=300",
      name: "Running Shoes Elite",
      price: 129,
      discountPrice: 109,
      discountPercentage: 40,
      delivery: "Free delivery",
      stock: "Out Of Stock",
      category: "Shoes",
    },
  ],
  Saree: [
    {
      image: "/placeholder.svg?height=300&width=300",
      name: "Silk Designer Saree",
      price: 399,
      discountPrice: 349,
      discountPercentage: 40,
      delivery: "Free delivery",
      stock: "High Stock",
      category: "Saree",
    },
  ],
  Mobile: [
    {
      image: "/placeholder.svg?height=300&width=300",
      name: "Smartphone Ultra",
      price: 999,
      discountPrice: 899,
      discountPercentage: 50,
      delivery: "Free delivery",
      stock: "In Stock",
      category: "Mobile",
    },
  ],
};

export function HomePage() {
  const scrollContainerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scroll = (categoryIndex: number, direction: "left" | "right") => {
    const container = scrollContainerRefs.current[categoryIndex];
    if (container) {
      const scrollAmount =
        direction === "left" ? -container.offsetWidth : container.offsetWidth;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="mt-16">
      <AutoCarousel />
      <div className="space-y-8 p-4">
        {categories.map((category, categoryIndex) => (
          <section key={category} className="space-y-4">
            <h2 className="text-2xl font-bold">{category}</h2>
            <div className="relative">
              <div
                ref={(el) => (scrollContainerRefs.current[categoryIndex] = el)}
                className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
              >
                <div className="grid grid-flow-col gap-4 auto-cols-[calc(50%-8px)] md:auto-cols-[calc(20%-16px)]">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <HomeProductCard
                      key={index}
                      {...products[category as keyof typeof products][0]}
                    />
                  ))}
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="absolute -left-4 top-1/2 hidden -translate-y-1/2 md:flex"
                onClick={() => scroll(categoryIndex, "left")}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute -right-4 top-1/2 hidden -translate-y-1/2 md:flex"
                onClick={() => scroll(categoryIndex, "right")}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}




// import { useRef, useState } from "react"
// import { ChevronLeft, ChevronRight, Flame, ShoppingBag, Shirt, Phone, TrendingUp } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { ProductCard } from "./product-card"
// import { cn } from "@/lib/utils"

// const categories = [
//   { name: "Best Sellers", icon: Flame },
//   { name: "Trending", icon: TrendingUp },
//   { name: "Shoes", icon: ShoppingBag },
//   { name: "Saree", icon: Shirt },
//   { name: "Mobile", icon: Phone },
// ]

// const products = {
//   "Best Sellers": [
//     {
//       image: "/placeholder.svg?height=300&width=300",
//       name: "Premium Wireless Headphones",
//       description:
//         "High-quality wireless headphones with noise cancellation and premium sound quality for immersive listening experience.",
//       price: 29999,
//       discountPrice: 24999,
//       stock: 45,
//       category: "Electronics",
//       rating: 4.5,
//       isNew: true,
//     },
//     // Add more products...
//   ],
//   Trending: [
//     {
//       image: "/placeholder.svg?height=300&width=300",
//       name: "Smart Watch Pro",
//       description: "Advanced smartwatch with health tracking features and long battery life.",
//       price: 19999,
//       discountPrice: 17999,
//       stock: 30,
//       category: "Wearables",
//       rating: 4.2,
//     },
//     // Add more products...
//   ],
//   Shoes: [
//     {
//       image: "/placeholder.svg?height=300&width=300",
//       name: "Running Shoes Elite",
//       description: "Professional running shoes with advanced cushioning technology for maximum comfort.",
//       price: 12999,
//       stock: 25,
//       category: "Footwear",
//       rating: 4.7,
//       isNew: true,
//     },
//     // Add more products...
//   ],
//   Saree: [
//     {
//       image: "/placeholder.svg?height=300&width=300",
//       name: "Silk Designer Saree",
//       description: "Traditional silk saree with modern design patterns and premium quality fabric.",
//       price: 39999,
//       discountPrice: 34999,
//       stock: 15,
//       category: "Fashion",
//       rating: 4.8,
//     },
//     // Add more products...
//   ],
//   Mobile: [
//     {
//       image: "/placeholder.svg?height=300&width=300",
//       name: "Smartphone Ultra",
//       description: "Latest smartphone with advanced camera system and powerful performance.",
//       price: 99999,
//       discountPrice: 89999,
//       stock: 20,
//       category: "Electronics",
//       rating: 4.6,
//       isNew: true,
//     },
//     // Add more products...
//   ],
// }

// export function ProductGrid() {
//   const scrollContainerRefs = useRef<(HTMLDivElement | null)[]>([])
//   const [activeCategory, setActiveCategory] = useState("Best Sellers")

//   const scroll = (categoryIndex: number, direction: "left" | "right") => {
//     const container = scrollContainerRefs.current[categoryIndex]
//     if (container) {
//       const scrollAmount = direction === "left" ? -container.offsetWidth : container.offsetWidth
//       container.scrollBy({ left: scrollAmount, behavior: "smooth" })
//     }
//   }

//   return (
//     <div className="space-y-8 py-8">
//       <div className="scrollbar-hide flex gap-2 overflow-x-auto px-4">
//         {categories.map((category) => {
//           const Icon = category.icon
//           return (
//             <Button
//               key={category.name}
//               variant={activeCategory === category.name ? "default" : "outline"}
//               className="min-w-max"
//               onClick={() => setActiveCategory(category.name)}
//             >
//               <Icon className="mr-2 h-4 w-4" />
//               {category.name}
//             </Button>
//           )
//         })}
//       </div>

//       <div className="space-y-8">
//         {categories.map((category, categoryIndex) => (
//           <section
//             key={category.name}
//             className={cn(
//               "space-y-4 px-4 transition-opacity duration-300",
//               activeCategory === category.name ? "block" : "hidden",
//             )}
//           >
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <category.icon className="h-6 w-6" />
//                 <h2 className="text-2xl font-bold">{category.name}</h2>
//               </div>
//               <div className="flex gap-2">
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   className="hidden md:flex"
//                   onClick={() => scroll(categoryIndex, "left")}
//                 >
//                   <ChevronLeft className="h-4 w-4" />
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   className="hidden md:flex"
//                   onClick={() => scroll(categoryIndex, "right")}
//                 >
//                   <ChevronRight className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//             <div className="relative">
//               <div
//                 ref={(el) => (scrollContainerRefs.current[categoryIndex] = el)}
//                 className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
//               >
//                 <div className="grid grid-flow-col gap-4 auto-cols-[calc(50%-8px)] md:auto-cols-[calc(20%-16px)]">
//                   {Array.from({ length: 10 }).map((_, index) => (
//                     <ProductCard key={index} {...products[category.name as keyof typeof products][0]} />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </section>
//         ))}
//       </div>
//     </div>
//   )
// }

 