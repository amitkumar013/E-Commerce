import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeProductCard from "@/components/HomeProductCard";
import { AutoCarousel } from "@/components/AutoCarousel";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

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
    const URI = import.meta.env.VITE_BACKEND_URL;
    try {
      const { data } = await axios.get(`${URI}/api/v1/products/home-products`);
      if (!data?.data) throw new Error("Invalid product data");

      const validateProducts = (items: Product[] | undefined) =>
        Array.isArray(items)
          ? items.filter((p) => p?._id && p?.name).map((p) => ({ ...p, id: p._id }))
          : [];

      const formattedProducts = {
        "Best Sellers": validateProducts(data.data.bestSellerProducts),
        "Trending": validateProducts(data.data.trendingProducts),
        "Shoes": validateProducts(data.data.shoesProducts),
        "Saree": validateProducts(data.data.sareeProducts),
        "Mobile": validateProducts(data.data.mobileProducts),
      };

      setProducts(formattedProducts);
      localStorage.setItem(
        "homeProducts",
        JSON.stringify({
          data: formattedProducts,
          timestamp: Date.now(),
        })
      );
    } catch (error) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("homeProducts");
    if (stored) {
      const { data, timestamp } = JSON.parse(stored);
      const isExpired = !timestamp || (Date.now() - timestamp > 1 * 60 * 1000);
      if (isExpired) {
        getHomeProducts();
      } else {
        setProducts(data);
        setLoading(false);
      }
    } else {
      getHomeProducts();
    }
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
                  <div className="grid grid-flow-col gap-4">
                    {loading ? (
                      <p className="text-center text-gray-500">Loading products...</p>
                    ) : categoryProducts.length > 0 ? (
                      categoryProducts.map((product:Product) =>
                        product && product._id ? (
                          <Link to={`/product-details/${product._id}`}>
                            <HomeProductCard key={product._id} product={product} />
                          </Link>
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
