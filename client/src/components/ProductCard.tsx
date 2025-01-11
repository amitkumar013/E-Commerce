import { useState } from 'react'
import { Star, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Product {
  id: number
  name: string
  image: string
  rating: number
  price: number
}

export default function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false)

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
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-40 md:h-48 lg:h-64">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3 md:p-4">
        <h2 className="text-lg md:text-xl font-semibold mb-2 truncate">{product.name}</h2>
        <div className="flex items-center mb-2">
          {renderStars(product.rating)}
          <span className="ml-1 text-sm text-gray-600">({product.rating.toFixed(1)})</span>
        </div>
        <p className="text-lg md:text-xl font-bold mb-4">₹{product.price.toLocaleString('en-IN')}</p>
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
