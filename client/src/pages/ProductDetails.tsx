import { useEffect, useState } from "react";
import { Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
interface Product {
  _id: string;
  name: string;
  description: string;
  images: string;
  rating: number;
  price: number;
  discountPrice: number;
  discountPercentage: number;
  sizes: string[];
  colors: string[];
  category: string;
  sellerName: string;
  brand: string;
  totalReviews: number;
  specifications: string;
}
export function ProductDetails() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<any>(null);
  const [liked, setLiked] = useState(false);
  const [product, setProduct] = useState({
    images: [],
    colors: [],
    sizes: [],
    brand: "",
    name: "",
    rating: 0,
    totalReviews: 0,
    price: 0,
    discountPrice: 0,
    discountPercentage: 0,
    sellerName: "",
    description: "",
    specifications: {},
  });
  const [likedProducts, setLikedProducts] = useState<string[]>([]);
  const { id } = useParams();
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);

  //-------Get single products-------
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/products/${id}`
      );
      //console.log("Sizes:", product.sizes);

      if (!data || !data.data) {
        throw new Error("Product data is undefined");
      }
      setProduct(data?.data);
      //getSimilarProducts(data?.product._id, data?.product.categoryId._id);
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
      const URI = import.meta.env.VITE_BACKEND_URL;
      const { data } = await axios.get(
        `${URI}/products/similar-products/${pid}/${cid}`
      );

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

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="group relative aspect-square overflow-hidden rounded-lg border bg-muted">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
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
          <div className="space-y-2">
            <p className="text-lg font-semibold text-primary">
              {product.brand}
            </p>
            <h1 className="text-3xl font-bold tracking-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5 transition-colors duration-200",
                      i < Math.floor(product.rating)
                        ? "fill-primary text-primary"
                        : "fill-muted text-muted-foreground"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.totalReviews} reviews)
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-primary">
                ₹{product.price}
              </span>

              <span className="text-lg text-muted-foreground line-through">
                ₹{product.discountPrice}
              </span>

              <Badge variant="secondary" className="ml-2">
                {product.discountPercentage}% OFF
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Inclusive of all taxes
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Color</Label>
              <RadioGroup
                defaultValue={selectedColor}
                onValueChange={setSelectedColor}
                className="flex gap-2"
              >
                {product.colors.map((color: any) => (
                  <div key={color._id} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={color.name}
                      id={`color-${color._id}`}
                    />
                    <Label
                      htmlFor={`color-${color._id}`}
                      className="flex items-center space-x-2"
                    >
                      {color.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label className="text-base">Size</Label>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size: string | number, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "relative h-12 rounded-lg border text-sm font-medium transition-all duration-200 hover:border-primary hover:bg-primary/5",
                      selectedSize === size && "border-primary bg-primary/10"
                    )}
                  >
                    {String(size)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2 rounded-lg bg-muted/50 p-4 backdrop-blur-sm">
            <p className="text-sm font-medium">Seller</p>
            <p className="text-sm text-muted-foreground">
              {product.sellerName}
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              className="flex-1 text-base transition-transform active:scale-95"
              variant="outline"
            >
              Add to Cart
            </Button>
            <Button className="flex-1 text-base transition-transform active:scale-95">
              Buy Now
            </Button>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="description" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="space-y-4">
                <div className="rounded-lg border p-6">
                  <p className="leading-relaxed text-muted-foreground">
                    {product.description}
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="specifications" className="space-y-4">
                <div className="rounded-lg border p-6">
                  <dl className="space-y-4">
                    {product.specifications &&
                    Object.entries(product.specifications).length > 0 ? (
                      Object.entries(product.specifications).map(([key]) => (
                        <div
                          key={key}
                          className="grid grid-cols-1 gap-2 sm:grid-cols-3"
                        >
                          <dt className="font-medium">{key}</dt>
                          <dd className="text-muted-foreground sm:col-span-2"></dd>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground">
                        No specifications available
                      </p>
                    )}
                  </dl>
                </div>
              </TabsContent>
            </Tabs>
          </div>
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
