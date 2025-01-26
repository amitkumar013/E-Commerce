import { useState, useEffect } from 'react'
import ProductCard from '@/components/ProductCard'
import axios from 'axios'

interface Product {
  id: string
  name: string
  image: string
  rating: number
  price: number
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/v1/products/")

      const productsData = data.products
      if (!productsData) {
        throw new Error("Products data is undefined")
      }

      const mappedProducts = productsData.map((product: any) => ({
        id: product._id,
        name: product.name,
        image: product.images[0],
        rating: 0,
        price: product.price,
      }))
      setProducts(mappedProducts)
      // console.log("Mapped Products: " + JSON.stringify(mappedProducts))
    } catch (error) {
      // console.log("Getting All products: " + error)
      setError("Failed to fetch products...")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}