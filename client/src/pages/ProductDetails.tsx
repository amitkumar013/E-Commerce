import { useEffect, useState } from "react";
import { Star, Heart, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "@/context/cartContext";
interface Product {
  _id: string;
  name: string;
  description: string;
  images: string;
  ratings: Rating[];
  price: number;
  discountPrice: number;
  discountPercentage: number;
  sizes: string[];
  colors: string[];
  category: string;
  sellerName: string;
  brand: string;
  specifications: { [key: string]: string };
  quantity: number;
}
interface Rating {
  userId: string;
  rating: number;
  comment: string;
  userName: string;
  date: string;
}
interface CartItem {
  _id: string;
  images: string;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  discountPercentage: number;
  quantity: number;
}

export function ProductDetails() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<any>(null);
  const [liked, setLiked] = useState(false);
  const [product, setProduct] = useState({
    _id: "",
    images: [],
    colors: [],
    sizes: [],
    brand: "",
    name: "",
    ratings: [],
    totalReviews: 0,
    price: 0,
    discountPrice: 0,
    discountPercentage: 0,
    sellerName: "",
    description: "",
    specifications: {},
    quantity: 0,
  });
  const [likedProducts, setLikedProducts] = useState<string[]>([]);
  const { id } = useParams();
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { cart, setCart } = useCart();
  const URI = import.meta.env.VITE_BACKEND_URL;

  //-------Get single products-------
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`${URI}/api/v1/products/single-product/${id}`);

      if (!data || !data.data) {
        throw new Error("Product data is undefined");
      }
      setProduct(data?.data);
      getSimilarProducts(data.data._id, data.data.category);
    } catch (error) {
      console.error("Failed to fetch products...");
    }
  };

  useEffect(() => {
    if (id) {
      getSingleProduct();
    }
  }, [id]);

  useEffect(() => {
    if (product.colors?.length) {
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes?.[0] || null);
    }
  }, [product]);

  //------Get similar products------
  const getSimilarProducts = async (pid: string, cid: string) => {
    try {
      const { data } = await axios.get(`${URI}/api/v1/products/similar-products/${pid}/${cid}`);

      setSimilarProducts(data.data.similarProducts);
    } catch (error) {
      setSimilarProducts([]);
      console.error("Failed to fetch similar products...", error);
    }
  };

  const toggleLike = (productId: string) => {
    setLikedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const averageRating =
    product.ratings.length > 0
      ? product.ratings.reduce(
          (acc: number, curr: Rating) => acc + (curr.rating || 0),
          0
        ) / product.ratings.length
      : 0;

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="group relative overflow-hidden rounded-lg border bg-muted">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-[520px] object-contain transition-transform duration-300 group-hover:scale-150"
            />
            <Button
              variant="secondary"
              size="icon"
              className={cn(
                "absolute right-4 top-4 z-10 transition-all duration-300",
                liked ? "text-red-500 hover:text-red-600" : "hover:text-red-500"
              )}
              onClick={() => setLiked(!liked)}
            >
              <Heart className={cn("h-5 w-5", liked && "fill-current")} />
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={cn(
                  "group relative aspect-square overflow-hidden rounded-lg border bg-muted transition-all duration-200",
                  selectedImage === index
                    ? "ring-2 ring-primary ring-offset-2"
                    : "hover:ring-2 hover:ring-primary/50 hover:ring-offset-2"
                )}
              >
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-lg font-semibold text-primary">
              {product.brand}
            </p>
            <h1 className="text-3xl font-bold tracking-tight">
              {product.name}
            </h1>

            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-5 w-5 transition-colors duration-200",
                    i < Math.round(averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-muted text-muted-foreground"
                  )}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-primary">
                ₹{product.price}
              </span>

              <span className="text-lg text-muted-foreground line-through">
                ₹{product.discountPrice}
              </span>

              <Badge
                variant="secondary"
                className="ml-2 bg-green-200 text-white-800 px-2 py-1 rounded-full font-medium"
              >
                {product.discountPercentage}% OFF
              </Badge>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-8">
              <Label>Color</Label>
              <RadioGroup
                defaultValue={selectedColor}
                onValueChange={setSelectedColor}
                className="flex gap-4 items-center"
              >
                {product.colors.map((color: any) => (
                  <div key={color._id} className="flex items-center gap-2">
                    <RadioGroupItem
                      value={color.name}
                      id={`color-${color._id}`}
                      className="h-6 w-6 rounded-full border"
                      style={{ backgroundColor: color.name }}
                    />
                    <Label htmlFor={`color-${color._id}`} className="text-sm">
                      {color.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex items-center gap-8">
              <Label className="text-base">Size</Label>
              <div className="flex gap-2">
                {product.sizes.map((size: string | number, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "h-10 w-10 flex items-center justify-center rounded-lg border text-sm font-medium transition-all duration-200 hover:border-primary hover:bg-primary/5",
                      selectedSize === size && "border-primary bg-primary/10"
                    )}
                  >
                    {String(size)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8 rounded-lg bg-muted/50 p-1 backdrop-blur-sm">
            <p className="text-sm font-medium">Seller</p>
            <p className="text-sm text-muted-foreground">{product.sellerName}</p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              onClick={() => {
                const cartItem: CartItem = {
                  _id: product._id,
                  images: product.images[0],
                  name: product.name,
                  description: product.description,
                  price: product.price,
                  discountPrice: product.discountPrice,
                  discountPercentage: product.discountPercentage,
                  quantity: product.quantity || 1,
                };

                const isAlreadyInCart = cart.some(
                  (item) => item.name === product.name
                );

                if (isAlreadyInCart) {
                  toast.error("Product is already in the cart");
                } else {
                  setCart([...cart, cartItem]);
                  localStorage.setItem(
                    "cart",
                    JSON.stringify([...cart, cartItem])
                  );
                  toast.success("Product added to cart");
                }
              }}
              className="flex-1 w-full h-12 text-base transition-transform active:scale-95"
              variant="outline"
            >
              Add to Cart
            </Button>
          </div>

          <div className="w-full">
            <Link to="/place-order">
              <Button className="flex-1 w-full h-12 text-base transition-transform active:scale-95">
                Buy Now
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Product Details Accordion */}
      <div className="mt-12 space-y-4">
        <div className="rounded-lg border">
          <button
            className="flex w-full items-center justify-between p-4 text-left"
            onClick={() => toggleSection("description")}
          >
            <h3 className="text-lg font-semibold">Description</h3>
            <ChevronDown
              className={cn(
                "h-5 w-5 transition-transform duration-200",
                activeSection === "description" && "rotate-180"
              )}
            />
          </button>
          {activeSection === "description" && (
            <div className="border-t p-4">
              <p className="leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            </div>
          )}
        </div>

        <div className="rounded-lg border">
          <button
            className="flex w-full items-center justify-between p-4 text-left"
            onClick={() => toggleSection("specifications")}
          >
            <h3 className="text-lg font-semibold">Specifications</h3>
            <ChevronDown
              className={cn(
                "h-5 w-5 transition-transform duration-200",
                activeSection === "specifications" && "rotate-180"
              )}
            />
          </button>
          {activeSection === "specifications" && (
            <div className="border-t p-4">
              {product.specifications &&
              Object.keys(product.specifications).length > 0 ? (
                <dl className="space-y-4">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="grid grid-cols-1 gap-2 sm:grid-cols-3"
                      >
                        <dt className="font-medium">{key}</dt>
                        <dd className="text-muted-foreground sm:col-span-2">
                          {String(value)}
                        </dd>
                      </div>
                    )
                  )}
                </dl>
              ) : (
                <p className="text-muted-foreground text-center">
                  No data available
                </p>
              )}
            </div>
          )}
        </div>

        {/* Ratings & Reviews */}
        <div className="space-y-4 md:col-span-8">
          {Array.isArray(product.ratings) && product.ratings.length > 0 ? (
            product.ratings.map((review: Rating, index: number) => (
              <div key={index} className="space-y-2 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {review?.userName ?? "Anonymous"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-4 w-4",
                              i < (review?.rating ?? 0)
                                ? "fill-primary text-primary"
                                : "fill-muted text-muted-foreground"
                            )}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {review?.date
                          ? new Date(review.date).toLocaleDateString()
                          : "No date available"}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  {review?.comment ?? "No comment provided."}
                </p>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No reviews yet.</p>
          )}
        </div>
      </div>

      {/* Similar Products */}
      <section className="mt-16 space-y-4">
        <h2 className="text-2xl font-bold">Similar Products</h2>
        {similarProducts.length === 0 ? (
          <p className="text-center text-muted-foreground">No product found</p>
        ) : (
          <div className="relative">
            <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-4">
              {similarProducts.map((p, index) => {
                const productId = `similar-${index}`;
                const isLiked = likedProducts.includes(productId);

                return (
                  <Link
                    to={`/product-details/${p._id}`}
                    key={index}
                    className="block"
                  >
                    <Card
                      key={index}
                      className="group min-w-[250px] flex-none transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <CardContent className="p-4">
                        <div className="relative mb-2 h-56 w-full aspect-square overflow-hidden rounded-lg bg-muted">
                          <img
                            src={
                              Array.isArray(p.images)
                                ? p.images[0]
                                : p.images.split(",")[0]
                            }
                            alt={p.name}
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <Button
                            variant="secondary"
                            size="icon"
                            className={cn(
                              "absolute right-2 top-2 z-10 transition-all duration-300",
                              isLiked
                                ? "text-red-500"
                                : "text-muted-foreground",
                              "opacity-0 group-hover:opacity-100"
                            )}
                            onClick={() => toggleLike(productId)}
                          >
                            <Heart
                              className={cn(
                                "h-4 w-4",
                                isLiked && "fill-current"
                              )}
                            />
                          </Button>
                        </div>
                        <h3 className="font-semibold">{p.name}</h3>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="font-bold text-primary">
                            ₹{p.discountPrice}
                          </span>
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{p.price}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
