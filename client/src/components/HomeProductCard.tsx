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
    <Card className="group overflow-hidden transition-transform duration-300 hover:-translate-y-3 hover:shadow-lg rounded-lg w-full md:w-52 lg:w-64 max-w-[300px]">
      <div className="relative h-[130px] md:h-[250px] w-full">
        <img
          src={
            Array.isArray(product.images) && product.images.length > 0
              ? product.images[0]
              : "/placeholder.svg"
          }
          alt={product.name}
          className="h-[135px] md:h-[210px] lg:h-[230px] w-full object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
        />

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 opacity-60 transition-opacity duration-300 group-hover:opacity-100"
        >
          <Heart className="h-5 w-5 text-red-500" />
        </Button>
      </div>
      <CardContent className="p-3 space-y-1">
        <h2 className="font-semibold text-sm truncate">{product.name}</h2>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <span className="text-[13px] font-bold text-base text-gray-900">
              ₹{product.price}
            </span>
            <span className="text-xs text-gray-500 line-through">
              ₹{product.discountPrice}
            </span>
            {product.discountPercentage && (
              <span className="text-[9px] text-green-600 font-semibold bg-green-100 px-1.5 py-0.5 rounded-md whitespace-nowrap">
                {product.discountPercentage}% OFF
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-gray-600">
          <p className="font-medium whitespace-nowrap">free delivery</p>
          <span
            className={`py-0.5 rounded-full font-semibold capitalize ${
              product.stock?.toLowerCase().includes("out")
                ? "text-red-600 bg-red-100"
                : product.stock?.toLowerCase().includes("low")
                ? "text-yellow-600 bg-yellow-100"
                : "text-green-600 bg-green-100"
            }`}
          >
            {product.stock ? product.stock.replace(/^\d+\s*/, "") : "In Stock"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default HomeProductCard;
