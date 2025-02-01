import { FC } from 'react';
import { Star } from 'lucide-react';
 
interface Product {
  id: string;
  name: string;
  image: string;
  rating: number;
  price: number;
  description: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

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
        <div className="flex items-center mb-2">
          {renderStars(product.rating)}
          <span className="ml-1 text-sm text-gray-600">({product.rating.toFixed(1)})</span>
        </div>
        <p className="text-lg md:text-xl font-semibold">₹{product.price.toLocaleString('en-IN')}</p>
        <p className="text-sm text-gray-600 mb-2 truncate">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductCard;
