import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  ShoppingCart,
  User,
  X,
  Heart,
  LogOut,
  CreditCard,
  Settings,
  Shield,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/cartContext";
import { useAuth } from "@/context/authContext";

export function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cart } = useCart();
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth({ user: null, token: "" });
    setIsDropdownOpen(false); // Close dropdown
    navigate("/auth/login");
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-4 flex items-center">

        <Link to="/" className="text-2xl font-bold text-primary mr-auto">
          EShop
        </Link>

        <nav className="hidden md:flex items-center space-x-2 ml-4">
          <Link to="/collection" className="text-gray-600 hover:text-primary">
            Collection
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-2 flex-1 max-w-md mx-6">
          <Input type="text" placeholder="Search products" className="w-full" />
          <Button size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSearch}>
            <Search className="h-5 w-5" />
          </Button>

          {/* User Dropdown */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={toggleDropdown}
            >
              <User className="h-5 w-5" />
            </Button>

            {isDropdownOpen && (
              <div className="absolute left-0 items-center w-48 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
                <ul className="py-2 text-sm text-gray-700">
                  <li>
                    <Link
                      to="/my-order"
                      className="flex items-center px-4 py-2 hover:bg-gray-100 w-full"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2 text-blue-500" /> My
                      Order
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/wishlist"
                      className="flex items-center px-4 py-2 hover:bg-gray-100 w-full"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Heart className="h-4 w-4 mr-2 text-red-500" /> Wishlist
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 hover:bg-gray-100 w-full"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <User className="h-4 w-4 mr-2 text-gray-600" /> Profile
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/payment"
                      className="flex items-center px-4 py-2 hover:bg-gray-100 w-full"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <CreditCard className="h-4 w-4 mr-2 text-green-500" />{" "}
                      Payment
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 hover:bg-gray-100 w-full"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Settings className="h-4 w-4 mr-2 text-gray-600" />{" "}
                      Settings
                    </Link>
                  </li>
                  <li>
                    <button
                      className="flex items-center px-4 py-2 hover:bg-red-100 w-full text-red-600"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          {/* Cart Button */}
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ShoppingCart className="h-5 w-5" />
              {cart?.length > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 text-xs bg-primary text-white rounded-full flex items-center justify-center">
                  {cart?.length}
                </span>
              )}
            </Button>
          </Link>

          {/* Admin */}
          <Link to="http://localhost:5174" className="relative">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 shadow-md flex items-center gap-1"
            >
              <Shield className="h-5 w-5" />
              Admin
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isSearchOpen && (
        <div className="md:hidden px-4 py-2 bg-gray-100 flex items-center">
          <Input type="text" placeholder="Search products" className="w-full" />
          <Button size="icon" onClick={toggleSearch}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}
    </header>
  );
}
