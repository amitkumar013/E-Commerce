import { useEffect, useState } from "react";
import HomeProductCard from "@/components/HomeProductCard";
import { Link, useLocation } from "react-router-dom";
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

export function SearchPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const { results } = location.state || {};

  useEffect(() => {
    if (results && results.data && results.data.products) {
      setProducts(results.data.products);
      setLoading(false);
    } else {
      setLoading(false);
      toast.error("No search results found.");
    }
  }, [results]);

  return (
    <div className="flex flex-col min-h-screen pt-24 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Search Results</h1>
  
      <div className="flex-grow">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {loading ? (
            <p className="text-center text-gray-500 col-span-full">Loading products...</p>
          ) : products.length > 0 ? (
            products.map((product: Product) =>
              product && product._id ? (
                <Link to={`/product-details/${product._id}`} key={product._id}>
                  <HomeProductCard product={product} />
                </Link>
              ) : null
            )
          ) : (
            <p className="text-center text-gray-500 col-span-full">No products found</p>
          )}
        </div>
      </div>
  
      <footer className="mt-8 py-6 text-center text-gray-400 text-sm"></footer>
    </div>
  );
  
  
}
