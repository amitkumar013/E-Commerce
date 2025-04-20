import type React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Edit, ImageIcon, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import toast from "react-hot-toast";
import axios from "axios";
interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
}

export default function ProductManage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  // Edit state
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editFormData, setEditFormData] = useState<{
    name: string;
    price: number;
    image: string;
  }>({
    name: "",
    price: 0,
    image: "",
  });
  const auth = localStorage.getItem("auth");
  const token = auth ? JSON.parse(auth).token : null;
  const URI = import.meta.env.VITE_BACKEND_URL;

  //---------get admin products---------
  const getAdminProducts = async () => {
    try {
      const { data } = await axios.get(
        `${URI}/api/v1/admin-products/get-admin-products`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data?.success && Array.isArray(data.data.products)) {
        setProducts(data.data.products);
      } else {
        toast.error(data?.message || "Failed to fetch products");
        setProducts([]);
      }
    } catch (error: any) {
      toast.error("Error fetching products:", error);
      if (error.response) {
        toast.error(error.response.data?.message || "Server error occurred");
      } else if (error.request) {
        toast.error("Network error occurred. Please check your connection.");
      } else {
        toast.error("An unexpected error occurred");
      }

      setProducts([]);
    }
  };
  useEffect(() => {
    getAdminProducts();
  }, []);

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle delete confirmation
  const handleDeleteClick = (productId: number) => {
    setProductToDelete(productId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // In a real app, you would delete the product here
    toast.success(`Deleting product ${productToDelete}`);
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  // Handle edit
  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setEditFormData({
      name: product.name,
      price: product.price,
      image: product.images[0],
    });
    setEditDialogOpen(true);
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number.parseFloat(value) || 0 : value,
    }));
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would update the product here
    console.log(`Updating product ${editingProduct?.id}`, editFormData);
    setEditDialogOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="container mx-auto pr-4 sm:pr-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-6">Product Management</h1>

        {/* Toolbar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <Card className="p-4 bg-white shadow-md border rounded-md">
              <p className="text-sm font-medium text-gray-600">
                Total Products:{" "}
                <span className="font-bold text-gray-800">
                  {filteredProducts.length}
                </span>
              </p>
            </Card>
            <Card className="p-4 bg-white shadow-md border rounded-md">
              <p className="text-sm font-medium text-gray-600">
                Total Price:{" "}
                <span className="font-bold text-gray-800">
                  ₹
                  {filteredProducts
                    .reduce((sum, product) => sum + product.price, 0)
                    .toLocaleString()}
                </span>
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Products Table (Desktop) */}
      <div className="hidden md:block rounded-md border bg-background overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id} className="group">
                <TableCell>
                  <div className="h-16 w-16 rounded-md border overflow-hidden">
                    <img
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name || "Product Image"}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>₹{product.price.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      onClick={() => handleEditClick(product)}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => handleDeleteClick(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Products Grid (Mobile) */}
      <div className="grid gap-4 md:hidden pr-4">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-md border overflow-hidden flex-shrink-0">
                    <img
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name || "Product Image"}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      ₹{product.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleEditClick(product)}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => handleDeleteClick(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center pr-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Make changes to the product details below.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
            <div className="grid gap-4 py-4">
              {/* Product Image */}
              <div className="grid gap-2">
                <Label htmlFor="image">Product Image</Label>
                <div className="flex items-center gap-4">
                  <div className="h-24 w-24 rounded-md border overflow-hidden bg-muted flex items-center justify-center">
                    {editFormData.image ? (
                      <img
                        src={editFormData.image || "/placeholder.svg"} // Use the first image in the array
                        alt="Product preview"
                        width={96}
                        height={96}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <Input
                      id="image"
                      name="image"
                      value={editFormData.image}
                      onChange={handleEditFormChange}
                      placeholder="Image URL"
                      className="mb-2"
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter the URL of the product image
                    </p>
                  </div>
                </div>
              </div>

              {/* Product Name */}
              <div className="grid gap-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditFormChange}
                  placeholder="Enter product name"
                  required
                />
              </div>

              {/* Product Price */}
              <div className="grid gap-2">
                <Label htmlFor="price">Price (₹)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    ₹
                  </span>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={editFormData.price}
                    onChange={handleEditFormChange}
                    className="pl-7"
                    required
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
