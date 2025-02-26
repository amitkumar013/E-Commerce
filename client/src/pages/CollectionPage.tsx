import { useState, useEffect } from "react";
import ProductCard from "@/components/CollectionCard";
import axios from "axios";
import { AutoCarousel } from "@/components/AutoCarousel";
import Filters from "@/components/Filters";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  price: number;
  category: string;
  brand: string;
}

const categories = ["Electronics", "Fashion", "Home", "Beauty"];
const brands = ["Apple", "Samsung", "Nike", "Adidas", "Sony"];
const priceRanges = [
  { label: "Under ₹500", min: 0, max: 500 },
  { label: "₹500 - ₹1000", min: 500, max: 1000 },
  { label: "₹1000 - ₹5000", min: 1000, max: 5000 },
  { label: "Above ₹5000", min: 5000, max: Infinity },
]; 

export default function CollectionPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<{ min: number; max: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all products
  const getAllProducts = async () => {
    try {
      const URI = import.meta.env.VITE_BACKEND_URL;
      const { data } = await axios.get(`${URI}/products/`);
      const productsData = data.products;
      if (!productsData) throw new Error("Products data is undefined");

      const mappedProducts = productsData.map((product: any) => ({
        id: product._id,
        name: product.name,
        description: product.description,
        image: product.images[0],
        rating: 0,
        price: product.price,
        category: product.category || "Others",
        brand: product.brand || "Unknown",
      }));

      setProducts(mappedProducts);
      setFilteredProducts(mappedProducts);
    } catch (error) {
      setError("Failed to fetch products...");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = products;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => selectedCategories.includes(product.category));
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) => selectedBrands.includes(product.brand));
    }

    if (selectedPrice) {
      filtered = filtered.filter((product) => product.price >= selectedPrice.min && product.price <= selectedPrice.max);
    }

    setFilteredProducts(filtered);
  }, [selectedCategories, selectedBrands, selectedPrice, products]);

  // Toggle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  // Toggle brand selection
  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  // Reset Filters
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedPrice(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mt-16 max-w-7xl mx-auto px-4">
      <AutoCarousel />

      <div className="flex flex-col md:flex-row gap-6 mt-5">
        <Filters
          categories={categories}
          brands={brands}
          priceRanges={priceRanges}
          selectedCategories={selectedCategories}
          selectedBrands={selectedBrands}
          selectedPrice={selectedPrice}
          onCategoryChange={handleCategoryChange}
          onBrandChange={handleBrandChange}
          onPriceChange={setSelectedPrice}
          resetFilters={resetFilters}
        />

        <section className="w-full md:w-3/4">
          <h1 className="text-2xl font-bold mb-5 text-center">All Products</h1>
          <Link to={"/products/slug"}>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
            ) : (
              <p className="text-gray-500">No products found.</p>
            )}22
          </div>
          </Link>
           
        </section>
      </div>
    </div>
  );
}


// import { useState, useEffect } from "react";
// import ProductCard from "@/components/ProductCard";
// import axios from "axios";
// import { AutoCarousel } from "@/components/AutoCarousel";
// import Filters from "@/components/Filters";

// interface Product {
//   id: string;
//   name: string;
//   description: string;
//   image: string;
//   rating: number;
//   price: number;
//   category: string;
// }

// // Categories
// const categories = ["Electronics", "Fashion", "Home", "Beauty"];
// // Price Ranges
// const priceRanges = [
//   { label: "Under ₹500", min: 0, max: 500 },
//   { label: "₹500 - ₹1000", min: 500, max: 1000 },
//   { label: "₹1000 - ₹5000", min: 1000, max: 5000 },
//   { label: "Above ₹5000", min: 5000, max: Infinity },
// ];

// export default function HomePage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [selectedPrice, setSelectedPrice] = useState<{ min: number; max: number } | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch all products
//   const getAllProducts = async () => {
//     try {
//       const { data } = await axios.get("http://localhost:8000/api/v1/products/");
//       const productsData = data.products;
//       if (!productsData) throw new Error("Products data is undefined");

//       const mappedProducts = productsData.map((product: any) => ({
//         id: product._id,
//         name: product.name,
//         description: product.description,
//         image: product.images[0],
//         rating: 0,
//         price: product.price,
//         category: product.category || "Others",
//       }));

//       setProducts(mappedProducts);
//       setFilteredProducts(mappedProducts);
//     } catch (error) {
//       setError("Failed to fetch products...");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getAllProducts();
//   }, []);

//   // Apply filters
//   useEffect(() => {
//     let filtered = products;

//     if (selectedCategories.length > 0) {
//       filtered = filtered.filter((product) => selectedCategories.includes(product.category));
//     }

//     if (selectedPrice) {
//       filtered = filtered.filter((product) => product.price >= selectedPrice.min && product.price <= selectedPrice.max);
//     }

//     setFilteredProducts(filtered);
//   }, [selectedCategories, selectedPrice, products]);

//   // Toggle category selection
//   const handleCategoryChange = (category: string) => {
//     setSelectedCategories((prev) =>
//       prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
//     );
//   };

//   // Reset Filters
//   const resetFilters = () => {
//     setSelectedCategories([]);
//     setSelectedPrice(null);
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="mt-16 max-w-7xl mx-auto px-4">
//       <AutoCarousel />

//       <div className="flex flex-col md:flex-row gap-6 mt-5">
//         {/* Filters Component */}
//         <Filters
//           categories={categories}
//           priceRanges={priceRanges}
//           selectedCategories={selectedCategories}
//           selectedPrice={selectedPrice}
//           onCategoryChange={handleCategoryChange}
//           onPriceChange={setSelectedPrice}
//           resetFilters={resetFilters}
//         />

//         {/* Product List */}
//         <section className="w-full md:w-3/4">
//           <h1 className="text-2xl font-bold mb-5">All Products</h1>
//           <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
//             {filteredProducts.length > 0 ? (
//               filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
//             ) : (
//               <p className="text-gray-500">No products found.</p>
//             )}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }
