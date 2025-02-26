import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FC } from "react";

interface Product {
  _id: string;
  name: string;
  images?: string[];
  price: number;
  discountPrice?: number;
  discountPercentage?: number;
  delivery: string | number;
  stock?: string;
}

interface ProductCardProps {
  product: Product;
}

const HomeProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="group overflow-hidden transition-transform duration-300 hover:-translate-y-3 hover:shadow-lg rounded-lg w-64">
      <div className="relative h-[250px] w-full">
        <img
          src={
            Array.isArray(product.images) && product.images.length > 0
              ? product.images[0]
              : "/placeholder.svg"
          }
          alt={product.name}
          className="h-full w-full object-cover rounded-t-lg"
        />

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 opacity-60 transition-opacity duration-300 group-hover:opacity-100"
        >
          <Heart className="h-5 w-5 text-red-500" />
        </Button>
      </div>
      <CardContent className="p-4">
        <h2 className="font-semibold text-lg">{product.name}</h2>
        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-gray-900">
              ₹{product.price}
            </span>
            <span className="text-sm text-gray-500 line-through">
              ₹{product.discountPrice}
            </span>

            <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-lg">
              {product.discountPercentage}% OFF
            </span>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
          <p className="font-medium">{product.delivery}</p>
          <span
            className={`px-2 py-1 rounded-2xl font-semibold
              ${
                product.stock?.toLowerCase().includes("out")
                  ? "text-red-600 bg-red-100"
                  : ""
              }
              ${
                product.stock?.toLowerCase().includes("low")
                  ? "text-yellow-600 bg-yellow-100"
                  : ""
              }
              ${
                !product.stock || product.stock.toLowerCase().includes("in")
                  ? "text-green-600 bg-green-100"
                  : ""
              }
            `}
          >
            {product.stock ? product.stock.replace(/^\d+\s*/, "") : "In Stock"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default HomeProductCard;
