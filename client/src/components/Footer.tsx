import {
  Twitter,
  Instagram,
  YoutubeIcon as YouTube,
  Shield,
  FacebookIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import easyShop from "@/assets/EasyShop.png";

export function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-700">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link
              to="/"
              className="flex items-center text-xl font-bold text-white mr-auto"
            >
              <img
                src={easyShop}
                alt="easyShop Logo"
                className="h-12 w-12 mr-2"
              />
            </Link>
            <p className="text-base text-gray-400">
              Making e-commerce easy and accessible for everyone.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Facebook</span>
                <FacebookIcon className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">YouTube</span>
                <YouTube className="h-6 w-6" />
              </a>
              <a
                href="https://eshop-admin-sand-gamma.vercel.app"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Admin Panel</span>
                <Shield className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                  Shop
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      to="/collection"
                      className="text-base text-gray-400 hover:text-white transition-colors"
                    >
                      Collection
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/categories"
                      className="text-base text-gray-400 hover:text-white transition-colors"
                    >
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/deals"
                      className="text-base text-gray-400 hover:text-white transition-colors"
                    >
                      Deals
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                  Support
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      to="/contact"
                      className="text-base text-gray-400 hover:text-white transition-colors"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/faq"
                      className="text-base text-gray-400 hover:text-white transition-colors"
                    >
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/shipping"
                      className="text-base text-gray-400 hover:text-white transition-colors"
                    >
                      Shipping
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/returns"
                      className="text-base text-gray-400 hover:text-white transition-colors"
                    >
                      Returns
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                  Company
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      to="/about"
                      className="text-base text-gray-400 hover:text-white transition-colors"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/blog"
                      className="text-base text-gray-400 hover:text-white transition-colors"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/careers"
                      className="text-base text-gray-400 hover:text-white transition-colors"
                    >
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                  Subscribe
                </h3>
                <p className="mt-4 text-base text-gray-400">
                  Get the latest news and offers.
                </p>
                <form className="mt-4 flex flex-col sm:max-w-md">
                  <Input
                    type="email"
                    name="email-address"
                    id="email-address"
                    required
                    placeholder="Enter your email"
                    className="w-full bg-gray-800 text-white placeholder-gray-500"
                  />
                  <div className="mt-3">
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary-dark text-white transition-colors"
                    >
                      Subscribe
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; 2025 easyShop, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
