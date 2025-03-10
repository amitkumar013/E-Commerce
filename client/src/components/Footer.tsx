import { Facebook, Twitter, Instagram, YoutubeIcon as YouTube } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link to="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary">EShop</span>
            </Link>
            <p className="text-base text-muted-foreground">
              Making e-commerce easy and accessible for everyone.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">YouTube</span>
                <YouTube className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Shop</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/collection" className="text-base text-muted-foreground hover:text-foreground">
                      All Products
                    </Link>
                  </li>
                  <li>
                    <Link to="/categories" className="text-base text-muted-foreground hover:text-foreground">
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link to="/deals" className="text-base text-muted-foreground hover:text-foreground">
                      Deals
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Support</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/contact" className="text-base text-muted-foreground hover:text-foreground">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/faq" className="text-base text-muted-foreground hover:text-foreground">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link to="/shipping" className="text-base text-muted-foreground hover:text-foreground">
                      Shipping
                    </Link>
                  </li>
                  <li>
                    <Link to="/returns" className="text-base text-muted-foreground hover:text-foreground">
                      Returns
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Company</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/about" className="text-base text-muted-foreground hover:text-foreground">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="text-base text-muted-foreground hover:text-foreground">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link to="/careers" className="text-base text-muted-foreground hover:text-foreground">
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Subscribe</h3>
                <p className="mt-4 text-base text-muted-foreground">
                  Get the latest news and offers.
                </p>
                <form className="mt-4 sm:flex sm:max-w-md">
                  <Input
                    type="email"
                    name="email-address"
                    id="email-address"
                    required
                    placeholder="Enter your email"
                    className="w-full"
                  />
                  <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                    <Button type="submit">Subscribe</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-muted pt-8">
          <p className="text-base text-muted-foreground xl:text-center">
            &copy; 2023 EShop, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
