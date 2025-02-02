import { useState } from "react";
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

export default function AddProduct() {
  const [images, setImages] = useState<{ [key: string]: string }>({
    image1: "",
    image2: "",
    image3: "",
    image4: "",
  });
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
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
  const discounts = ["No Discount", "10%", "20%", "30%", "40%", "50%"];

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    imageKey: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImages((prev) => ({ ...prev, [imageKey]: imageUrl }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-2xl font-bold">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Product Name</Label>
          <Input id="name" placeholder="Enter product name" required />
        </div>

        {/* Images */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="space-y-2">
              <Label htmlFor={`image${num}`}>Image {num}</Label>
              <div className="relative">
                <Input
                  id={`image${num}`}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, `image${num}`)}
                />
                <div
                  className="min-h-[200px] border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:border-primary"
                  onClick={() =>
                    document.getElementById(`image${num}`)?.click()
                  }
                >
                  {images[`image${num}`] ? (
                    <img
                      src={images[`image${num || "/placeholder.svg"}`]}
                      alt={`Product ${num}`}
                      className="max-h-[200px] object-contain"
                    />
                  ) : (
                    <Plus className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
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
            className="min-h-[100px]"
            required
          />
        </div>

        {/* Price */}
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            min="0"
            step="1"
            placeholder="Enter price"
            required
          />
        </div>

        {/* Quantity */}
        <div className="space-y-2">
          <Label htmlFor="name">Quantity</Label>
          <Input
            id="name"
            placeholder="Enter quantity"
            type="number"
            required
          />
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
                onClick={() => {
                  setSelectedSizes((prev) =>
                    prev.includes(size)
                      ? prev.filter((s) => s !== size)
                      : [...prev, size]
                  );
                }}
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
                onClick={() => {
                  setSelectedColors((prev) =>
                    prev.includes(color)
                      ? prev.filter((c) => c !== color)
                      : [...prev, color]
                  );
                }}
              >
                {color}
              </Button>
            ))}
          </div>
        </div>

        {/* Discount */}
        <div className="space-y-2">
          <Label htmlFor="discount">Discount</Label>
          <Select defaultValue="0">
            <SelectTrigger>
              <SelectValue placeholder="Select discount" />
            </SelectTrigger>
            <SelectContent>
              {discounts.map((discount) => (
                <SelectItem key={discount} value={discount}>
                  {discount}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Delivery */}
        <div className="space-y-2">
          <Label htmlFor="delivery">Delivery</Label>
          <Select defaultValue="free">
            <SelectTrigger>
              <SelectValue placeholder="Select delivery option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="free">Free Delivery</SelectItem>
              <SelectItem value="express">Express Delivery</SelectItem>
              <SelectItem value="standard">Standard Delivery</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full md:w-auto">
          Add Product
        </Button>
      </form>
    </div>
  );
}
