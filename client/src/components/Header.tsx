import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  LogOut,
  Settings,
  Shield,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/cartContext";
import { useAuth } from "@/context/authContext";
import easyShop from "@/assets/EasyShop.png";
import { SearchBar } from "@/components/SearchBar";

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
    setIsDropdownOpen(false);
    navigate("/auth/login");
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50 ">
      <div className="container mx-auto px-4 py-2 flex items-center">
        <Link
          to="/"
          className="flex items-center text-xl font-bold text-primary mr-auto"
        >
          <img src={easyShop} alt="easyShop Logo" className="h-12 w-12 mr-2" />
        </Link>

        <nav className="hidden md:flex items-center space-x-2 ml-4">
          <Link to="/collection" className="text-gray-600 hover:text-primary">
            Collection
          </Link>
        </nav>

        <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <SearchBar />
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleSearch}
          >
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
          <Link
            to="https://eshop-admin-sand-gamma.vercel.app"
            className="relative"
          >
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
      {isSearchOpen && <SearchBar isMobile onClose={toggleSearch} />}
    </header>
  );
}
