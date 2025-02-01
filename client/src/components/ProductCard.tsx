import { FC } from 'react'
import { Star, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Product {
  id: string
  name: string
  image: string
  rating: number
  price: number
}

interface ProductCardProps {
  product: Product
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105">
      <div className="relative h-40 md:h-48 lg:h-44">
        <img
          src={product.image}
          alt={product.name}
          className="min-w-full h-48 object-cover"
        />
      </div>
      <div className="p-3 md:p-4">
        <h2 className="text-lg md:text-xl font-semibold truncate">{product.name}</h2>
        <div className="flex items-center">
          {renderStars(product.rating)}
          <span className="ml-1 text-sm text-gray-600">({product.rating.toFixed(1)})</span>
        </div>
        <p className="text-lg md:text-xl font-bold mb-2">₹{product.price.toLocaleString('en-IN')}</p>
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs md:text-sm"
            onClick={() => alert('Added to cart!')}
          >
            <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
