import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeProductCard from "@/components/HomeProductCard";
import { AutoCarousel } from "@/components/AutoCarousel";
import axios from "axios";
import { Link } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  image?: string;
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
  
      const validateProducts = (items: Product[] | undefined) => 
        Array.isArray(items) 
          ? items.filter(p => p?._id && p?.name).map(p => ({ ...p, id: p._id })) 
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
                  <Link to={"/product-details"} className="grid grid-flow-col gap-4">
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
                  </Link>
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

 

// import { useEffect, useState } from "react";
// import axios from "axios";
// import HomeProductCard from "@/components/HomeProductCard";
// import { Skeleton } from "@/components/ui/skeleton";

// interface Product {
//   _id: string;
//   name: string;
//   images?: string[];
//   price: number;
//   discountPrice?: number;
//   discountPercentage?: number;
//   delivery: string | number;
//   stock?: string;
// }

// export function HomePage() {
//   const [products, setProducts] = useState<{
//     trendingProducts: Product[];
//     bestSellerProducts: Product[];
//     shoesProducts: Product[];
//     sareeProducts: Product[];
//     mobileProducts: Product[];
//   } | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const { data } = await axios.get(
//           "http://localhost:8000/api/v1/products/home-products"
//         );
//         console.log("API Response:", data); // Debug API Response

//         if (data.success) {
//           setProducts(data.data);
//         } else {
//           console.error("Failed to fetch products");
//         }
//       } catch (error) {
//         console.error("Error fetching products", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (loading) {
//     return (
//       <div className="container mx-auto p-4">
//         <h2 className="text-xl font-semibold mb-4">Loading Products...</h2>
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {Array.from({ length: 6 }).map((_, index) => (
//             <Skeleton key={index} className="h-80 w-64 rounded-lg" />
//           ))}
//         </div>
//       </div>
//     );
//   }

//   if (!products) {
//     return (
//       <div className="container mx-auto p-4">
//         <h2 className="text-xl font-semibold text-red-500">
//           No Products Available
//         </h2>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4">
//       {/* Dynamic Category Display */}
//       {Object.entries(products).map(([categoryKey, categoryProducts]) => (
//         <div key={categoryKey} className="mb-10">
//           <h2 className="text-xl font-semibold capitalize mb-4">
//             {categoryKey.replace(/Products$/, "").replace(/([A-Z])/g, " $1")}
//           </h2>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {categoryProducts?.filter(Boolean).length > 0 ? (
//               categoryProducts.map((product: any) => (
//                 <HomeProductCard key={product._id} product={product} />
//               ))
//             ) : (
//               <p className="text-gray-500">No products available.</p>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

