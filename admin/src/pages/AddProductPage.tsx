import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Category {
  _id: string;
  name: string;
}

export default function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [discount, setDiscount] = useState("");
  const [delivery, setDelivery] = useState("");
  const [brand, setBrand] = useState("yes");
  const [stock, setStock] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [images, setImages] = useState<{ [key: string]: File | null }>({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });
  const [loading, setLoading] = useState(false);
  const colors = [
    "Black",
    "White",
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Purple",
    "Gray",
  ];
  const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
  const discounts = ["No Discount", "10%", "20%", "30%", "40%", "50%"];
  const navigate = useNavigate();

  //const token = JSON.parse(localStorage.getItem("auth") || "{}")?.data?.token || "";
  const authData = localStorage.getItem("auth");
  const parsedAuth = authData ? JSON.parse(authData) : null;
  const token = parsedAuth?.data?.token;

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setImages((prev) => ({ ...prev, [key]: file }));
    }
  };

  //-------------Get All Categories------------
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/categorys/get-all-category",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data?.success) {
        setCategories(data.data);
      } else {
        toast.error("Failed to fetch categories");
      }
    } catch (error) {
      toast.error("Couldn't get categories");
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  //-----------Create a new product------------
  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !price || !colors || !sizes) {
      return toast.error("Please fill all required fields");
    }

    try {
      setLoading(true);
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("colors", JSON.stringify(selectedColors));
      productData.append("sizes", JSON.stringify(selectedSizes));
      productData.append("discount", discount);
      productData.append("delivery", delivery);
      productData.append("brand", brand);
      productData.append("stock", stock);
      productData.append("category", selectedCategory);

      Object.entries(images).forEach(([key, file]) => {
        if (file) {
          productData.append(key, file);
        }
      });

      const { data } = await axios.post(
        "http://localhost:8000/api/v1/products/add",
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data?.success) {
        toast.success("🎉 Product create successfully");

        setName("");
        setDescription("");
        setPrice("");
        setQuantity("");
        setSelectedColors([]);
        setSelectedSizes([]);
        setDiscount("");
        setDelivery("");
        setBrand("yes");
        setStock("");
        setSelectedCategory("");
        setImages({ image1: null, image2: null, image3: null, image4: null });
        navigate("/");
      } else {
        toast.error("⚠️ Failed to add product");
      }
    } catch (error) {
      toast.error("❌ Error submitting product");
    } finally {
      setLoading(false);
      console.log("🔄 Loading state reset.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Add New Product</h1>

      <form onSubmit={handleProductSubmit} className="space-y-6">
        {/* Product Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

         {/* Category */}
         <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c._id} value={c.name}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Images Upload */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {["image1", "image2", "image3", "image4"].map((key) => (
            <div key={key} className="space-y-2">
              <Label htmlFor={key}>Image</Label>
              <input
                id={key}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageChange(e, key)}
              />
              <div
                className="min-h-[200px] border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:border-primary"
                onClick={() => document.getElementById(key)?.click()}
              >
                {images[key] ? (
                  <img
                    src={URL.createObjectURL(images[key]!)}
                    className="max-h-[200px] object-contain"
                  />
                ) : (
                  <Plus className="h-8 w-8 text-muted-foreground" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter product description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Price & Quantity */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              placeholder="Enter price"
              type="number"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              placeholder="Enter quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Sizes */}
        <div className="space-y-2">
          <Label>Sizes</Label>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <Button
                key={size}
                type="button"
                variant={selectedSizes.includes(size) ? "default" : "outline"}
                onClick={() =>
                  setSelectedSizes((prev) =>
                    prev.includes(size)
                      ? prev.filter((s) => s !== size)
                      : [...prev, size]
                  )
                }
              >
                {size}
              </Button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div className="space-y-2">
          <Label>Colors</Label>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <Button
                key={color}
                type="button"
                variant={selectedColors.includes(color) ? "default" : "outline"}
                onClick={() =>
                  setSelectedColors((prev) =>
                    prev.includes(color)
                      ? prev.filter((c) => c !== color)
                      : [...prev, color]
                  )
                }
              >
                {color}
              </Button>
            ))}
          </div>
        </div>

        {/* Discount */}
        <div className="space-y-2">
          <Label htmlFor="discount">Discount</Label>
          <Select value={discount} onValueChange={setDiscount}>
            <SelectTrigger>
              <SelectValue placeholder="Select discount option" />
            </SelectTrigger>
            <SelectContent>
              {discounts.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Delivery */}
        <div className="space-y-2">
          <Label htmlFor="delivery">Delivery</Label>
          <Select value={delivery} onValueChange={setDelivery}>
            <SelectTrigger>
              <SelectValue placeholder="Select delivery option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="express">Express</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stock */}
        <div className="space-y-2">
          <Label htmlFor="stock">Stock</Label>
          <Select value={stock} onValueChange={setStock}>
            <SelectTrigger>
              <SelectValue placeholder="Select stock option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="in stock">In Stock</SelectItem>
              <SelectItem value="high stock">High Stock</SelectItem>
              <SelectItem value="low stock">Low Stock</SelectItem>
              <SelectItem value="out of stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Brand */}
        <div className="space-y-2">
          <Label htmlFor="brand">Brand</Label>
          <Select defaultValue="Yes">
            <SelectTrigger>
              <SelectValue placeholder="Select brand option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full md:w-auto" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </Button>
      </form>
    </div>
  );
}
