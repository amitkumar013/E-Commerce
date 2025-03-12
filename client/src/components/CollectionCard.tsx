import { FC } from "react";

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  discountPrice?: number;
  discountPercentage?: number;
  description: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  console.log("Product Data:", product);
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105 w-full max-w-sm">
      <div className="relative h-36 md:h-48 lg:h-48">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover bg-gray-500"
        />
      </div>
      <div className="p-3 md:p-4">
        <h2 className="text-lg md:text-xl font-normal truncate">{product.name}</h2>
        <p className="text-sm text-gray-600 mb-2 truncate">{product.description}</p>

        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-gray-900">₹{product.price}</span>

            {product.discountPrice && product.discountPercentage ? (
              <>
                <span className="text-sm text-gray-500 line-through">₹{product.discountPrice}</span>
                <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-lg">
                  {product.discountPercentage}% OFF
                </span>
              </>
            ) : (
              <span className="text-base text-gray-500">Free delivery</span>
            )}
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default ProductCard;
