// import { useEffect, useState, useRef } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import HomeProductCard from "@/components/HomeProductCard";
// import { AutoCarousel } from "@/components/AutoCarousel";
// import axios from "axios";

// interface Product {
//   _id: string;
//   name: string;
//   image?: string;
//   price: number;
//   discountPrice?: number;
//   discountPercentage?: number;
//   delivery: string | number;
//   stock: string;
// }


// const categories = ["Best Sellers", "Trending", "Shoes", "Saree", "Mobile"];

// export function HomePage() {
//   const scrollContainerRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const [products, setProducts] = useState<Record<string, Product[]>>({});
//   const [loading, setLoading] = useState(true);

//   // Fetch home products
//   const getHomeProducts = async () => {
//     try {
//       const { data } = await axios.get("http://localhost:8000/api/v1/products/home-products");
//       if (!data?.data) throw new Error("Invalid product data");
  
//       // Validate and map _id to id
//       const validateProducts = (items: Product[] | undefined) => 
//         Array.isArray(items) 
//           ? items.filter(p => p?._id && p?.name).map(p => ({ ...p, id: p._id })) 
//           : [];
  
//       const formattedProducts = {
//         "Best Sellers": validateProducts(data.data.bestSellerProducts),
//         "Trending": validateProducts(data.data.trendingProducts),
//         "Shoes": validateProducts(data.data.shoesProducts),
//         "Saree": validateProducts(data.data.sareeProducts),
//         "Mobile": validateProducts(data.data.mobileProducts),
//       };
  
//       console.log("API Response Data:", data.data);
//       console.log("Formatted Products:", formattedProducts);
      
//       setProducts(formattedProducts);
//     } catch (error) {
//       console.error("Failed to fetch products:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
  
  

//   useEffect(() => {
//     getHomeProducts();
//   }, []);

//   // Scroll function
//   const scroll = (categoryIndex: number, direction: "left" | "right") => {
//     const container = scrollContainerRefs.current[categoryIndex];
//     if (container) {
//       const scrollAmount = direction === "left" ? -container.offsetWidth : container.offsetWidth;
//       container.scrollBy({ left: scrollAmount, behavior: "smooth" });
//     }
//   };

//   return (
//     <div className="mt-16">
//       <AutoCarousel />
//       <div className="space-y-8 p-4">
//         {categories.map((category, categoryIndex) => {
//           const categoryProducts = products[category] || [];

//           return (
//             <section key={category} className="space-y-4">
//               <h2 className="text-2xl font-bold">{category}</h2>
//               <div className="relative">
//                 <div
//                   ref={(el) => (scrollContainerRefs.current[categoryIndex] = el)}
//                   className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
//                 >
//                   <div className="grid grid-flow-col gap-4 auto-cols-[calc(50%-8px)] md:auto-cols-[calc(20%-16px)]">
//                     {loading ? (
//                       <p className="text-center text-gray-500">Loading products...</p>
//                     ) : categoryProducts.length > 0 ? (
//                       categoryProducts.map((product:any) =>
//                         product && product.id ? (
//                           <HomeProductCard key={product.id} product={product} />
//                         ) : null
//                       )
//                     ) : (
//                       <p className="text-center text-gray-500">No products available</p>
//                     )}
//                   </div>
//                 </div>
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   className="absolute -left-4 top-1/2 hidden -translate-y-1/2 md:flex"
//                   onClick={() => scroll(categoryIndex, "left")}
//                 >
//                   <ChevronLeft className="h-4 w-4" />
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   className="absolute -right-4 top-1/2 hidden -translate-y-1/2 md:flex"
//                   onClick={() => scroll(categoryIndex, "right")}
//                 >
//                   <ChevronRight className="h-4 w-4" />
//                 </Button>
//               </div>
//             </section>
//           );
//         })}
//       </div>
//     </div>
//   );
// }




import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeProductCard from "@/components/HomeProductCard";
import { AutoCarousel } from "@/components/AutoCarousel";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  images?: string[];
  price: number;
  discountPrice?: number;
  discountPercentage?: number;
  delivery: string | number;
  stock: string;
}

const categories = ["Best Sellers", "Trending", "Shoes", "Saree", "Mobile"];

export function HomePage() {
  const scrollContainerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [products, setProducts] = useState<Record<string, Product[]>>({});
  const [loading, setLoading] = useState(true);

  // Fetch home products
  const getHomeProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/v1/products/home-products");
      if (!data?.data) throw new Error("Invalid product data");

      // Validate and map _id to id
      const validateProducts = (items: Product[] | undefined) =>
        Array.isArray(items)
          ? items
              .filter(p => p?._id && p?.name && Array.isArray(p.images) && p.images.length > 0)
              .map(p => ({ 
                ...p, 
                id: p._id, 
                image: p.images?.[0] || ""  // ✅ Ensure images exist before accessing index 0
              }))
          : [];
      



      const formattedProducts = {
        "Best Sellers": validateProducts(data.data.bestSellerProducts),
        "Trending": validateProducts(data.data.trendingProducts),
        "Shoes": validateProducts(data.data.shoesProducts),
        "Saree": validateProducts(data.data.sareeProducts),
        "Mobile": validateProducts(data.data.mobileProducts),
      };

      console.log("API Response Data:", data.data);
      console.log("Formatted Products:", formattedProducts);

      setProducts(formattedProducts);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    getHomeProducts();
  }, []);

  // Scroll function
  const scroll = (categoryIndex: number, direction: "left" | "right") => {
    const container = scrollContainerRefs.current[categoryIndex];
    if (container) {
      const scrollAmount = direction === "left" ? -container.offsetWidth : container.offsetWidth;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="mt-16">
      <AutoCarousel />
      <div className="space-y-8 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Shop Now</h1>
        {categories.map((category, categoryIndex) => {
          const categoryProducts = products[category] || [];

          return (
            <section key={category} className="space-y-4">
              <h2 className="text-2xl font-bold">{category}</h2>
              <div className="relative">
                <div
                  ref={(el) => (scrollContainerRefs.current[categoryIndex] = el)}
                  className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {loading ? (
                      <p className="text-center text-gray-500">Loading products...</p>
                    ) : categoryProducts.length > 0 ? (
                      categoryProducts.map((product:any) =>
                        product && product.id ? (
                          <HomeProductCard key={product.id} product={product} />
                        ) : null
                      )
                    ) : (
                      <p className="text-center text-gray-500">No products available</p>
                    )}
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
          );
        })}
      </div>
    </div>
  );
}


// import { useRef } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { HomeProductCard } from "@/components/HomeProductCard";
// import { AutoCarousel } from "@/components/AutoCarousel";

// const categories = ["Best Sellers", "Trending", "Shoes", "Saree", "Mobile"];

// const products = {
//   "Best Sellers": [
//     {
//       image: "/placeholder.svg?height=300&width=300",
//       name: "Premium Wireless Headphone",
//       price: 299,
//       discountPrice: 249,
//       discountPercentage: 40,
//       stock: "In Stock",
//       delivery: "Free delivery",
//       category: "Best Sellers",
//     },
//     // Add more products...
//   ],
//   Trending: [
//     {
//       image: "/placeholder.svg?height=300&width=300",
//       name: "Smart Watch Pro",
//       price: 199,
//       discountPrice: 179,
//       discountPercentage: 50,
//       delivery: "Free delivery",
//       stock: "In Stock",
//       category: "Trending",
//     },
//   ],
//   Shoes: [
//     {
//       image: "/placeholder.svg?height=300&width=300",
//       name: "Running Shoes Elite",
//       price: 129,
//       discountPrice: 109,
//       discountPercentage: 40,
//       delivery: "Free delivery",
//       stock: "Out Of Stock",
//       category: "Shoes",
//     },
//   ],
//   Saree: [
//     {
//       image: "/placeholder.svg?height=300&width=300",
//       name: "Silk Designer Saree",
//       price: 399,
//       discountPrice: 349,
//       discountPercentage: 40,
//       delivery: "Free delivery",
//       stock: "High Stock",
//       category: "Saree",
//     },
//   ],
//   Mobile: [
//     {
//       image: "/placeholder.svg?height=300&width=300",
//       name: "Smartphone Ultra",
//       price: 999,
//       discountPrice: 899,
//       discountPercentage: 50,
//       delivery: "Free delivery",
//       stock: "In Stock",
//       category: "Mobile",
//     },
//   ],
// };

// export function HomePage() {
//   const scrollContainerRefs = useRef<(HTMLDivElement | null)[]>([]);

//   const scroll = (categoryIndex: number, direction: "left" | "right") => {
//     const container = scrollContainerRefs.current[categoryIndex];
//     if (container) {
//       const scrollAmount =
//         direction === "left" ? -container.offsetWidth : container.offsetWidth;
//       container.scrollBy({ left: scrollAmount, behavior: "smooth" });
//     }
//   };

//   return (
//     <div className="mt-16">
//       <AutoCarousel />
//       <div className="space-y-8 p-4">
//         {categories.map((category, categoryIndex) => (
//           <section key={category} className="space-y-4">
//             <h2 className="text-2xl font-bold">{category}</h2>
//             <div className="relative">
//               <div
//                 ref={(el) => (scrollContainerRefs.current[categoryIndex] = el)}
//                 className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
//               >
//                 <div className="grid grid-flow-col gap-4 auto-cols-[calc(50%-8px)] md:auto-cols-[calc(20%-16px)]">
//                   {Array.from({ length: 10 }).map((_, index) => (
//                     <HomeProductCard
//                       key={index}
//                       {...products[category as keyof typeof products][0]}
//                     />
//                   ))}
//                 </div>
//               </div>
//               <Button
//                 variant="outline"
//                 size="icon"
//                 className="absolute -left-4 top-1/2 hidden -translate-y-1/2 md:flex"
//                 onClick={() => scroll(categoryIndex, "left")}
//               >
//                 <ChevronLeft className="h-4 w-4" />
//               </Button>
//               <Button
//                 variant="outline"
//                 size="icon"
//                 className="absolute -right-4 top-1/2 hidden -translate-y-1/2 md:flex"
//                 onClick={() => scroll(categoryIndex, "right")}
//               >
//                 <ChevronRight className="h-4 w-4" />
//               </Button>
//             </div>
//           </section>
//         ))}
//       </div>
//     </div>
//   );
// }




// import { useEffect, useState, useRef } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import HomeProductCard from "@/components/HomeProductCard";
// import { AutoCarousel } from "@/components/AutoCarousel";
// import axios from "axios";

// interface Product {
//   id: string;
//   name: string;
//   image: string;
//   price: number;
//   discountPrice?: number;
//   discountPercentage?: number;
//   delivery: string | number;
//   stock: string;
// }

// const categories = ["Best Sellers", "Trending", "Shoes", "Saree", "Mobile"];

// export function HomePage() {
//   const scrollContainerRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
//   const [bestSellerProducts, setBestSellerProducts] = useState<Product[]>([]);
//   const [shoesProducts, setShoesProducts] = useState<Product[]>([]);
//   const [sareeProducts, setSareeProducts] = useState<Product[]>([]);
//   const [mobileProducts, setMobileProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   //-------Fetch all products by category--------
//   const getHomeProducts = async () => {
//     try {
//       const { data } = await axios.get(
//         "http://localhost:8000/api/v1/products/home-products"
//       );
//       if (!data) throw new Error("Products data is undefined");

//       setTrendingProducts(data.trendingProducts);
//       setBestSellerProducts(data.bestSellerProducts);
//       setShoesProducts(data.shoesProducts);
//       setSareeProducts(data.sareeProducts);
//       setMobileProducts(data.mobileProducts);
//     } catch (error) {
//       console.error("Failed to fetch products:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getHomeProducts();
//   }, []);

//   //---------scroll toggle button--------
//   const scroll = (categoryIndex: number, direction: "left" | "right") => {
//     const container = scrollContainerRefs.current[categoryIndex];
//     if (container) {
//       const scrollAmount =
//         direction === "left" ? -container.offsetWidth : container.offsetWidth;
//       container.scrollBy({ left: scrollAmount, behavior: "smooth" });
//     }
//   };

//   return (
//     <div className="mt-16">
//       <AutoCarousel />
//       <div className="space-y-8 p-4">
//         {categories.map((category, categoryIndex) => {
//           let categoryProducts: Product[] = [];

//           switch (category) {
//             case "Best Sellers":
//               categoryProducts = bestSellerProducts;
//               break;
//             case "Trending":
//               categoryProducts = trendingProducts;
//               break;
//             case "Shoes":
//               categoryProducts = shoesProducts;
//               break;
//             case "Saree":
//               categoryProducts = sareeProducts;
//               break;
//             case "Mobile":
//               categoryProducts = mobileProducts;
//               break;
//             default:
//               categoryProducts = [];
//           }

//           return (
//             <section key={category} className="space-y-4">
//               <h2 className="text-2xl font-bold">{category}</h2>
//               <div className="relative">
//                 <div
//                   ref={(el) => (scrollContainerRefs.current[categoryIndex] = el)}
//                   className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
//                 >
//                   <div className="grid grid-flow-col gap-4 auto-cols-[calc(50%-8px)] md:auto-cols-[calc(20%-16px)]">
//                     {loading ? (
//                       <p className="text-center text-gray-500">Loading products...</p>
//                     ) : categoryProducts.length > 0 ? (
//                       categoryProducts.map((product) => (
//                         <HomeProductCard key={product.id} product={product} />
//                       ))
//                     ) : (
//                       <p className="text-center text-gray-500">No products available</p>
//                     )}
//                   </div>
//                 </div>
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   className="absolute -left-4 top-1/2 hidden -translate-y-1/2 md:flex"
//                   onClick={() => scroll(categoryIndex, "left")}
//                 >
//                   <ChevronLeft className="h-4 w-4" />
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   className="absolute -right-4 top-1/2 hidden -translate-y-1/2 md:flex"
//                   onClick={() => scroll(categoryIndex, "right")}
//                 >
//                   <ChevronRight className="h-4 w-4" />
//                 </Button>
//               </div>
//             </section>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
