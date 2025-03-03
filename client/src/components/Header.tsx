import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Menu, Search, ShoppingCart, User, X } from "lucide-react"
import { Link } from "react-router-dom"
import { useCart } from "@/context/cartContext"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const {cart} = useCart();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-4 flex items-center">
        {/* Mobile Menu Button - Far left */}
        <button onClick={toggleMenu} className="md:hidden mr-4">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <Link to="/" className="text-2xl font-bold text-primary mr-auto">
          EShop
        </Link>

        <nav className="hidden md:flex items-center space-x-6 ml-6">
          <Link to="/products" className="text-gray-600 hover:text-primary">
            Products
          </Link>
          <Link to="/categories" className="text-gray-600 hover:text-primary">
            Categories
          </Link>
          <Link to="/deals" className="text-gray-600 hover:text-primary">
            Deals
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-2 flex-1 max-w-md mx-6">
          <Input type="text" placeholder="Search products..." className="w-full" />
          <Button size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>

          <Link to="/cart" className="text-gray-600 hover:text-primary">
          <Button variant="ghost" size="icon" className="relative rounded-full">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-4 w-4 text-xs bg-primary text-primary-foreground rounded-full flex items-center justify-center">
              {cart?.length}
            </span>
          </Button>
            Cart 
          </Link>
          
          <Button variant="ghost" size="icon" className="relative rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col space-y-4 px-4 py-6 bg-gray-50">
            <Link to="/products" className="text-gray-600 hover:text-primary">
              Products
            </Link>
            <Link to="/categories" className="text-gray-600 hover:text-primary">
              Categories
            </Link>
            <Link to="/deals" className="text-gray-600 hover:text-primary">
              Deals
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
