import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  discountPrice?: number;
  discountPercentage?: number;
  delivery: string | number;
  stock: string;
}

export function HomeProductCard({
  image,
  name,
  price,
  discountPrice,
  discountPercentage,
  delivery,
  stock,
}: ProductCardProps) {
  return (
    <Card className="group overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          width={300}
          height={300}
          className="h-[250px] w-full object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 opacity-60 transition-opacity duration-300 group-hover:opacity-100"
        >
          <Heart className="h-5 w-5" />
        </Button>
      </div>
      <CardContent className="p-4">
        <h2 className="font-normal ">{name}</h2>
        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {discountPrice ? (
              <>
                <span className="font-medium">₹{discountPrice}</span>
                <span className="text-sm text-muted-foreground line-through">
                  ₹{price}
                </span>
                <span className="text-sm text-green-600">
                  {discountPercentage}% OFF
                </span>
              </>
            ) : (
              <span className="font-medium">₹{price}</span>
            )}
          </div>
        </div>
        <div className="mt-1 flex items-center justify-between text-sm text-gray-600">
          <p>{delivery}</p>
          <span
              className={`px-2 py-1 rounded-2xl text-green-500 bg-green-100 inline-block w-fit
                ${stock.toLowerCase().includes("out") ? "text-red-600 bg-red-100" : ""}
                ${stock.toLowerCase().includes("low") ? "text-yellow-600 bg-yellow-100" : ""}`}
            >
              {stock.replace(/^\d+\s*/, "")}
            </span>
        </div>
      </CardContent>
    </Card>
  );
}
