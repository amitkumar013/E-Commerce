
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Package,
//   Pencil,
//   Search,
//   Trash2,
//   AlertTriangle,
//   CheckCircle2,
//   IndianRupee,
// } from "lucide-react";
// import { Badge } from "@/components/ui/badge";

// // Stock threshold constants
// const LOW_STOCK_THRESHOLD = 30;
// const HIGH_STOCK_THRESHOLD = 50;

// // Sample product data with Indian Rupee prices
// const initialProducts = [
//   {
//     id: 1,
//     name: "Classic T-Shirt",
//     price: 1499,
//     image: "/placeholder.svg",
//     description: "Comfortable cotton t-shirt",
//     stock: 25,
//     category: "Clothing",
//   },
//   {
//     id: 2,
//     name: "Denim Jeans",
//     price: 2999,
//     image: "/placeholder.svg",
//     description: "Classic blue denim jeans",
//     stock: 15,
//     category: "Clothing",
//   },
//   {
//     id: 3,
//     name: "Sneakers",
//     price: 4999,
//     image: "/placeholder.svg",
//     description: "Casual athletic sneakers",
//     stock: 55,
//     category: "Footwear",
//   },
//   {
//     id: 4,
//     name: "Backpack",
//     price: 1999,
//     image: "/placeholder.svg",
//     description: "Durable everyday backpack",
//     stock: 40,
//     category: "Accessories",
//   },
// ];

// // Function to format price in Indian Rupees
// const formatPrice = (price: number) => {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 0,
//   }).format(price);
// };

// // Function to get stock status
// const getStockStatus = (stock: number) => {
//   if (stock < LOW_STOCK_THRESHOLD) {
//     return {
//       label: "Low Stock",
//       variant: "destructive" as const,
//       icon: AlertTriangle,
//     };
//   } else if (stock >= HIGH_STOCK_THRESHOLD) {
//     return {
//       label: "High Stock",
//       variant: "success" as const,
//       icon: CheckCircle2,
//     };
//   } else {
//     return {
//       label: "In Stock",
//       variant: "default" as const,
//       icon: Package,
//     };
//   }
// };

// export default function ProductManagement() {
//   const [products, setProducts] = useState(initialProducts);
//   const [editingProduct, setEditingProduct] = useState<
//     (typeof initialProducts)[0] | null
//   >(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   const filteredProducts = products.filter(
//     (product) =>
//       product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       product.category.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const lowStockCount = products.filter(
//     (p) => p.stock < LOW_STOCK_THRESHOLD
//   ).length;
//   const highStockCount = products.filter(
//     (p) => p.stock >= HIGH_STOCK_THRESHOLD
//   ).length;
//   const totalValue = products.reduce(
//     (sum, product) => sum + product.price * product.stock,
//     0
//   );

//   const handleDelete = (id: number) => {
//     setProducts(products.filter((product) => product.id !== id));
//   };

//   const handleEdit = (product: (typeof initialProducts)[0]) => {
//     setEditingProduct({ ...product });
//   };

//   const handleSave = (updatedProduct: (typeof initialProducts)[0]) => {
//     setProducts(
//       products.map((product) =>
//         product.id === updatedProduct.id ? updatedProduct : product
//       )
//     );
//     setEditingProduct(null);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50/50">
//       <div className="container mx-auto p-4 py-8">
//         {/* Header Section */}
//         <div className="mb-8">
//           <div className="flex items-center gap-2 mb-2">
//             <Package className="h-6 w-6 text-primary" />
//             <h1 className="text-2xl font-bold md:text-3xl">
//               Product Management
//             </h1>
//           </div>
//           <p className="text-muted-foreground">
//             Manage and organize your product inventory
//           </p>
//         </div>

//         {/* Search and Stats Section */}
//         <div className="mb-6 space-y-4">
//           <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
//             <div className="relative flex-1 max-w-md">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search products..."
//                 className="pl-8"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//               <Card className="bg-red-50">
//                 <CardHeader className="p-4">
//                   <CardTitle className="text-base font-medium text-red-700">
//                     Low Stock
//                   </CardTitle>
//                   <div className="flex items-baseline gap-1">
//                     <span className="text-2xl font-bold text-red-700">
//                       {lowStockCount}
//                     </span>
//                     <span className="text-sm text-red-600/80">products</span>
//                   </div>
//                 </CardHeader>
//               </Card>
//               <Card className="bg-green-50">
//                 <CardHeader className="p-4">
//                   <CardTitle className="text-base font-medium text-green-700">
//                     High Stock
//                   </CardTitle>
//                   <div className="flex items-baseline gap-1">
//                     <span className="text-2xl font-bold text-green-700">
//                       {highStockCount}
//                     </span>
//                     <span className="text-sm text-green-600/80">products</span>
//                   </div>
//                 </CardHeader>
//               </Card>
//               <Card className="col-span-2 md:col-span-1 bg-blue-50">
//                 <CardHeader className="p-4">
//                   <CardTitle className="text-base font-medium text-blue-700">
//                     Total Value
//                   </CardTitle>
//                   <div className="flex items-baseline gap-1">
//                     <span className="text-2xl font-bold text-blue-700">
//                       {formatPrice(totalValue)}
//                     </span>
//                   </div>
//                 </CardHeader>
//               </Card>
//             </div>
//           </div>
//         </div>

//         {/* Products Grid */}
//         <div className="grid gap-4">
//           {filteredProducts.length === 0 ? (
//             <div className="text-center py-12">
//               <Package className="mx-auto h-12 w-12 text-muted-foreground/50" />
//               <h3 className="mt-2 text-lg font-semibold">No products found</h3>
//               <p className="text-muted-foreground">
//                 Try adjusting your search query to find what you're looking for.
//               </p>
//             </div>
//           ) : (
//             filteredProducts.map((product) => {
//               const stockStatus = getStockStatus(product.stock);
//               const StockIcon = stockStatus.icon;

//               return (
//                 <Card
//                   key={product.id}
//                   className="overflow-hidden border-2 hover:border-primary/50 transition-colors"
//                 >
//                   <div className="flex flex-col sm:flex-row">
//                     {/* Image Section */}
//                     <div className="relative h-48 w-full sm:h-auto sm:w-48 group">
//                       <img
//                         src={product.image || "/placeholder.svg"}
//                         alt={product.name}
//                         className="object-cover transition-transform group-hover:scale-105"
//                       />
//                     </div>

//                     {/* Content Section */}
//                     <div className="flex flex-1 flex-col">
//                       <CardHeader>
//                         <div className="flex items-start justify-between">
//                           <div>
//                             <CardTitle className="mb-2">
//                               {product.name}
//                             </CardTitle>
//                             <CardDescription>
//                               {product.description}
//                             </CardDescription>
//                           </div>
//                           <Badge variant="secondary">{product.category}</Badge>
//                         </div>
//                       </CardHeader>
//                       <CardContent>
//                         <div className="flex flex-col gap-3">
//                           <div className="flex items-center gap-1">
//                             <IndianRupee className="h-5 w-5 text-primary" />
//                             <span className="text-2xl font-bold text-primary">
//                               {formatPrice(product.price).replace("₹", "")}
//                             </span>
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <Badge
//                               variant={stockStatus.variant}
//                               className="flex items-center gap-1"
//                             >
//                               <StockIcon className="h-3 w-3" />
//                               <span>{stockStatus.label}</span>
//                               <span className="ml-1">({product.stock})</span>
//                             </Badge>
//                           </div>
//                         </div>
//                       </CardContent>

//                       {/* Actions Section */}
//                       <div className="mt-auto flex items-center justify-end gap-2 p-4 border-t bg-gray-50/50">
//                         <Dialog>
//                           <DialogTrigger asChild>
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               onClick={() => handleEdit(product)}
//                               className="flex items-center gap-2"
//                             >
//                               <Pencil className="h-4 w-4" />
//                               Edit
//                             </Button>
//                           </DialogTrigger>
//                           <DialogContent>
//                             <DialogHeader>
//                               <DialogTitle>Edit Product</DialogTitle>
//                               <DialogDescription>
//                                 Make changes to the product details here.
//                               </DialogDescription>
//                             </DialogHeader>
//                             <div className="grid gap-4 py-4">
//                               <div className="grid gap-2">
//                                 <Label htmlFor="name">Name</Label>
//                                 <Input
//                                   id="name"
//                                   value={editingProduct?.name}
//                                   onChange={(e) =>
//                                     setEditingProduct(
//                                       editingProduct
//                                         ? {
//                                             ...editingProduct,
//                                             name: e.target.value,
//                                           }
//                                         : null
//                                     )
//                                   }
//                                 />
//                               </div>
//                               <div className="grid gap-2">
//                                 <Label htmlFor="price">Price (₹)</Label>
//                                 <Input
//                                   id="price"
//                                   type="number"
//                                   value={editingProduct?.price}
//                                   onChange={(e) =>
//                                     setEditingProduct(
//                                       editingProduct
//                                         ? {
//                                             ...editingProduct,
//                                             price: Number.parseInt(
//                                               e.target.value
//                                             ),
//                                           }
//                                         : null
//                                     )
//                                   }
//                                 />
//                               </div>
//                               <div className="grid gap-2">
//                                 <Label htmlFor="stock">Stock</Label>
//                                 <Input
//                                   id="stock"
//                                   type="number"
//                                   value={editingProduct?.stock}
//                                   onChange={(e) =>
//                                     setEditingProduct(
//                                       editingProduct
//                                         ? {
//                                             ...editingProduct,
//                                             stock: Number.parseInt(
//                                               e.target.value
//                                             ),
//                                           }
//                                         : null
//                                     )
//                                   }
//                                 />
//                               </div>
//                               <div className="grid gap-2">
//                                 <Label htmlFor="category">Category</Label>
//                                 <Input
//                                   id="category"
//                                   value={editingProduct?.category}
//                                   onChange={(e) =>
//                                     setEditingProduct(
//                                       editingProduct
//                                         ? {
//                                             ...editingProduct,
//                                             category: e.target.value,
//                                           }
//                                         : null
//                                     )
//                                   }
//                                 />
//                               </div>
//                               <div className="grid gap-2">
//                                 <Label htmlFor="description">Description</Label>
//                                 <Input
//                                   id="description"
//                                   value={editingProduct?.description}
//                                   onChange={(e) =>
//                                     setEditingProduct(
//                                       editingProduct
//                                         ? {
//                                             ...editingProduct,
//                                             description: e.target.value,
//                                           }
//                                         : null
//                                     )
//                                   }
//                                 />
//                               </div>
//                             </div>
//                             <DialogFooter>
//                               <Button
//                                 onClick={() =>
//                                   editingProduct && handleSave(editingProduct)
//                                 }
//                               >
//                                 Save changes
//                               </Button>
//                             </DialogFooter>
//                           </DialogContent>
//                         </Dialog>
//                         <Button
//                           variant="destructive"
//                           size="sm"
//                           onClick={() => handleDelete(product.id)}
//                           className="flex items-center gap-2"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                           Delete
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 </Card>
//               );
//             })
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }





 

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowDownUp, BarChart3, Package, Pencil, Search, ShoppingCart, Trash2, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"

// Sample product data with prices in Rupees
const initialProducts = [
  {
    id: 1,
    name: "Classic T-Shirt",
    price: 1499,
    image: "/placeholder.svg",
    description: "Comfortable cotton t-shirt",
    stock: 50,
    category: "Clothing",
    status: "In Stock",
    sales: 120,
    bgColor: "bg-blue-50",
  },
  {
    id: 2,
    name: "Denim Jeans",
    price: 2999,
    image: "/placeholder.svg",
    description: "Classic blue denim jeans",
    stock: 30,
    category: "Clothing",
    status: "Low Stock",
    sales: 85,
    bgColor: "bg-purple-50",
  },
  {
    id: 3,
    name: "Sneakers",
    price: 4999,
    image: "/placeholder.svg",
    description: "Casual athletic sneakers",
    stock: 25,
    category: "Footwear",
    status: "Low Stock",
    sales: 200,
    bgColor: "bg-green-50",
  },
  {
    id: 4,
    name: "Backpack",
    price: 1999,
    image: "/placeholder.svg",
    description: "Durable everyday backpack",
    stock: 40,
    category: "Accessories",
    status: "In Stock",
    sales: 150,
    bgColor: "bg-orange-50",
  },
]

// Format price in Indian Rupees
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price)
}

type SortKey = "name" | "price" | "stock" | "sales"

export default function ProductManagement() {
  const [products, setProducts] = useState(initialProducts)
  const [editingProduct, setEditingProduct] = useState<(typeof initialProducts)[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortKey, setSortKey] = useState<SortKey>("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])

  const totalValue = products.reduce((sum, product) => sum + product.price * product.stock, 0)
  const totalProducts = products.length
  const lowStockProducts = products.filter((p) => p.stock < 30).length
  const totalSales = products.reduce((sum, product) => sum + product.sales, 0)

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortOrder("asc")
    }
  }

  const sortedAndFilteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      const modifier = sortOrder === "asc" ? 1 : -1
      return a[sortKey] > b[sortKey] ? modifier : -modifier
    })

  const handleDelete = (id: number) => {
    setProducts(products.filter((product) => product.id !== id))
    setSelectedProducts(selectedProducts.filter((productId) => productId !== id))
  }

  const handleDeleteSelected = () => {
    setProducts(products.filter((product) => !selectedProducts.includes(product.id)))
    setSelectedProducts([])
  }

  const handleEdit = (product: (typeof initialProducts)[0]) => {
    setEditingProduct({ ...product })
  }

  const handleSave = (updatedProduct: (typeof initialProducts)[0]) => {
    setProducts(products.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)))
    setEditingProduct(null)
  }

  const toggleProductSelection = (productId: number) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const toggleAllProducts = () => {
    setSelectedProducts(
      selectedProducts.length === sortedAndFilteredProducts.length ? [] : sortedAndFilteredProducts.map((p) => p.id),
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto p-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Package className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold md:text-3xl bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text">
              Product Management
            </h1>
          </div>
          <p className="text-muted-foreground">Manage and organize your product inventory</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 mb-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <BarChart3 className="h-4 w-4 opacity-75" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatPrice(totalValue)}</div>
              <p className="text-xs opacity-75">Across all products</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 opacity-75" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProducts}</div>
              <p className="text-xs opacity-75">In inventory</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
              <ArrowDownUp className="h-4 w-4 opacity-75" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lowStockProducts}</div>
              <p className="text-xs opacity-75">Need attention</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <TrendingUp className="h-4 w-4 opacity-75" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSales}</div>
              <p className="text-xs opacity-75">All time</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Actions Section */}
        <Card className="mb-6 p-4 bg-white/50 backdrop-blur-sm border-none shadow-md">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 gap-4 md:max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-8 bg-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={sortKey} onValueChange={(value) => handleSort(value as SortKey)}>
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="stock">Stock</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {selectedProducts.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{selectedProducts.length} selected</span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDeleteSelected}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Selected
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Products Grid */}
        <div className="grid gap-4">
          {sortedAndFilteredProducts.length === 0 ? (
            <Card className="py-12 text-center bg-white/50 backdrop-blur-sm">
              <Package className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-2 text-lg font-semibold">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your search query to find what you're looking for.</p>
            </Card>
          ) : (
            <>
              {/* Table Header */}
              <div className="hidden md:flex items-center gap-4 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-lg shadow-sm">
                <div className="w-6">
                  <Checkbox
                    checked={selectedProducts.length === sortedAndFilteredProducts.length}
                    onCheckedChange={toggleAllProducts}
                  />
                </div>
                <div className="w-48">Image</div>
                <div className="flex-1">Details</div>
                <div className="w-32">Stock</div>
                <div className="w-32">Sales</div>
                <div className="w-32">Actions</div>
              </div>

              {/* Product Cards */}
              {sortedAndFilteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className={`overflow-hidden transition-all hover:shadow-lg ${
                    selectedProducts.includes(product.id) ? "border-primary shadow-md" : ""
                  } ${product.bgColor}`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:gap-4 p-4">
                    <div className="md:w-6">
                      <Checkbox
                        checked={selectedProducts.includes(product.id)}
                        onCheckedChange={() => toggleProductSelection(product.id)}
                      />
                    </div>
                    {/* Image Section */}
                    <div className="relative h-48 w-full md:h-24 md:w-48 group rounded-lg overflow-hidden bg-white">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 space-y-2 mt-4 md:mt-0">
                      <div>
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.description}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">{product.category}</Badge>
                        <Badge variant={product.stock < 30 ? "destructive" : "default"}>{product.status}</Badge>
                        <Badge variant="outline" className="font-mono bg-white">
                          {formatPrice(product.price)}
                        </Badge>
                      </div>
                    </div>

                    {/* Stock Section */}
                    <div className="md:w-32 mt-4 md:mt-0">
                      <div className="text-sm font-medium">Stock Level</div>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={(product.stock / 100) * 100}
                          className="h-2"
                          indicatorClassName={product.stock < 30 ? "bg-red-500" : ""}
                        />
                        <span className="text-sm tabular-nums">{product.stock}</span>
                      </div>
                    </div>

                    {/* Sales Section */}
                    <div className="md:w-32 mt-4 md:mt-0">
                      <div className="flex items-center gap-2">
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{product.sales}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Total sales</p>
                    </div>

                    {/* Actions Section */}
                    <div className="md:w-32 flex items-center gap-2 mt-4 md:mt-0">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(product)}
                            className="flex-1 md:flex-none bg-white"
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="ml-2 md:hidden">Edit</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Product</DialogTitle>
                            <DialogDescription>Make changes to the product details here.</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="name">Name</Label>
                              <Input
                                id="name"
                                value={editingProduct?.name}
                                onChange={(e) =>
                                  setEditingProduct(
                                    editingProduct
                                      ? {
                                          ...editingProduct,
                                          name: e.target.value,
                                        }
                                      : null,
                                  )
                                }
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="price">Price (₹)</Label>
                              <Input
                                id="price"
                                type="number"
                                value={editingProduct?.price}
                                onChange={(e) =>
                                  setEditingProduct(
                                    editingProduct
                                      ? {
                                          ...editingProduct,
                                          price: Number.parseFloat(e.target.value),
                                        }
                                      : null,
                                  )
                                }
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="stock">Stock</Label>
                              <Input
                                id="stock"
                                type="number"
                                value={editingProduct?.stock}
                                onChange={(e) =>
                                  setEditingProduct(
                                    editingProduct
                                      ? {
                                          ...editingProduct,
                                          stock: Number.parseInt(e.target.value),
                                        }
                                      : null,
                                  )
                                }
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="sales">Sales</Label>
                              <Input
                                id="sales"
                                type="number"
                                value={editingProduct?.sales}
                                onChange={(e) =>
                                  setEditingProduct(
                                    editingProduct
                                      ? {
                                          ...editingProduct,
                                          sales: Number.parseInt(e.target.value),
                                        }
                                      : null,
                                  )
                                }
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="category">Category</Label>
                              <Input
                                id="category"
                                value={editingProduct?.category}
                                onChange={(e) =>
                                  setEditingProduct(
                                    editingProduct
                                      ? {
                                          ...editingProduct,
                                          category: e.target.value,
                                        }
                                      : null,
                                  )
                                }
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="description">Description</Label>
                              <Input
                                id="description"
                                value={editingProduct?.description}
                                onChange={(e) =>
                                  setEditingProduct(
                                    editingProduct
                                      ? {
                                          ...editingProduct,
                                          description: e.target.value,
                                        }
                                      : null,
                                  )
                                }
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={() => editingProduct && handleSave(editingProduct)}>Save changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(product.id)}
                        className="flex-1 md:flex-none"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="ml-2 md:hidden">Delete</span>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}







// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { BarChart3, Package, Pencil, Search, Tags, Trash2 } from "lucide-react"
// import Image from "next/image"
// import { Badge } from "@/components/ui/badge"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Checkbox } from "@/components/ui/checkbox"

// // Sample product data with prices in Rupees
// const initialProducts = [
//   {
//     id: 1,
//     name: "Classic T-Shirt",
//     price: 1499,
//     image: "/placeholder.svg",
//     description: "Comfortable cotton t-shirt",
//     category: "Clothing",
//     tags: ["Cotton", "Casual", "Summer"],
//     bgColor: "bg-blue-50",
//   },
//   {
//     id: 2,
//     name: "Denim Jeans",
//     price: 2999,
//     image: "/placeholder.svg",
//     description: "Classic blue denim jeans",
//     category: "Clothing",
//     tags: ["Denim", "Casual", "All-Season"],
//     bgColor: "bg-purple-50",
//   },
//   {
//     id: 3,
//     name: "Sneakers",
//     price: 4999,
//     image: "/placeholder.svg",
//     description: "Casual athletic sneakers",
//     category: "Footwear",
//     tags: ["Sports", "Casual", "Comfort"],
//     bgColor: "bg-green-50",
//   },
//   {
//     id: 4,
//     name: "Backpack",
//     price: 1999,
//     image: "/placeholder.svg",
//     description: "Durable everyday backpack",
//     category: "Accessories",
//     tags: ["Travel", "School", "Waterproof"],
//     bgColor: "bg-orange-50",
//   },
// ]

// // Format price in Indian Rupees
// const formatPrice = (price: number) => {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 0,
//   }).format(price)
// }

// type SortKey = "name" | "price" | "category"

// export default function ProductManagement() {
//   const [products, setProducts] = useState(initialProducts)
//   const [editingProduct, setEditingProduct] = useState<(typeof initialProducts)[0] | null>(null)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [sortKey, setSortKey] = useState<SortKey>("name")
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
//   const [selectedProducts, setSelectedProducts] = useState<number[]>([])

//   const totalValue = products.reduce((sum, product) => sum + product.price, 0)
//   const totalProducts = products.length
//   const categories = [...new Set(products.map((p) => p.category))]

//   const handleSort = (key: SortKey) => {
//     if (sortKey === key) {
//       setSortOrder(sortOrder === "asc" ? "desc" : "asc")
//     } else {
//       setSortKey(key)
//       setSortOrder("asc")
//     }
//   }

//   const sortedAndFilteredProducts = products
//     .filter(
//       (product) =>
//         product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
//     )
//     .sort((a, b) => {
//       const modifier = sortOrder === "asc" ? 1 : -1
//       return a[sortKey] > b[sortKey] ? modifier : -modifier
//     })

//   const handleDelete = (id: number) => {
//     setProducts(products.filter((product) => product.id !== id))
//     setSelectedProducts(selectedProducts.filter((productId) => productId !== id))
//   }

//   const handleDeleteSelected = () => {
//     setProducts(products.filter((product) => !selectedProducts.includes(product.id)))
//     setSelectedProducts([])
//   }

//   const handleQuickPriceUpdate = (id: number, priceChange: number) => {
//     setProducts(
//       products.map((product) =>
//         product.id === id
//           ? {
//               ...product,
//               price: Math.max(0, product.price + priceChange),
//             }
//           : product,
//       ),
//     )
//   }

//   const toggleProductSelection = (productId: number) => {
//     setSelectedProducts((prev) =>
//       prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
//     )
//   }

//   const toggleAllProducts = () => {
//     setSelectedProducts(
//       selectedProducts.length === sortedAndFilteredProducts.length ? [] : sortedAndFilteredProducts.map((p) => p.id),
//     )
//   }

//   const handleSave = (product: (typeof initialProducts)[0]) => {
//     setProducts(products.map((p) => (p.id === product.id ? product : p)))
//     setEditingProduct(null)
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
//       <div className="container mx-auto p-4 py-8">
//         {/* Header Section */}
//         <div className="mb-8">
//           <div className="flex items-center gap-2 mb-2">
//             <Package className="h-6 w-6 text-primary" />
//             <h1 className="text-2xl font-bold md:text-3xl bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text">
//               Product Management
//             </h1>
//           </div>
//           <p className="text-muted-foreground">Manage and organize your product inventory</p>
//         </div>

//         {/* Statistics Cards */}
//         <div className="grid gap-4 mb-6 md:grid-cols-3">
//           <Card className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground hover:shadow-lg transition-shadow">
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//               <CardTitle className="text-sm font-medium">Total Value</CardTitle>
//               <BarChart3 className="h-4 w-4 opacity-75" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{formatPrice(totalValue)}</div>
//               <p className="text-xs opacity-75">Catalog value</p>
//             </CardContent>
//           </Card>
//           <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white hover:shadow-lg transition-shadow">
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//               <CardTitle className="text-sm font-medium">Total Products</CardTitle>
//               <Package className="h-4 w-4 opacity-75" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{totalProducts}</div>
//               <p className="text-xs opacity-75">In catalog</p>
//             </CardContent>
//           </Card>
//           <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white hover:shadow-lg transition-shadow">
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//               <CardTitle className="text-sm font-medium">Categories</CardTitle>
//               <Tags className="h-4 w-4 opacity-75" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{categories.length}</div>
//               <p className="text-xs opacity-75">Product categories</p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Search and Actions Section */}
//         <Card className="mb-6 p-4 bg-white/50 backdrop-blur-sm border-none shadow-md">
//           <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//             <div className="flex flex-1 gap-4 md:max-w-md">
//               <div className="relative flex-1">
//                 <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   placeholder="Search products or tags..."
//                   className="pl-8 bg-white"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>
//               <Select value={sortKey} onValueChange={(value) => handleSort(value as SortKey)}>
//                 <SelectTrigger className="w-[180px] bg-white">
//                   <SelectValue placeholder="Sort by" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="name">Name</SelectItem>
//                   <SelectItem value="price">Price</SelectItem>
//                   <SelectItem value="category">Category</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             {selectedProducts.length > 0 && (
//               <div className="flex items-center gap-2">
//                 <span className="text-sm text-muted-foreground">{selectedProducts.length} selected</span>
//                 <Button
//                   variant="destructive"
//                   size="sm"
//                   onClick={handleDeleteSelected}
//                   className="flex items-center gap-2"
//                 >
//                   <Trash2 className="h-4 w-4" />
//                   Delete Selected
//                 </Button>
//               </div>
//             )}
//           </div>
//         </Card>

//         {/* Products Grid */}
//         <div className="grid gap-4">
//           {sortedAndFilteredProducts.length === 0 ? (
//             <Card className="py-12 text-center bg-white/50 backdrop-blur-sm">
//               <Package className="mx-auto h-12 w-12 text-muted-foreground/50" />
//               <h3 className="mt-2 text-lg font-semibold">No products found</h3>
//               <p className="text-muted-foreground">Try adjusting your search query to find what you're looking for.</p>
//             </Card>
//           ) : (
//             <>
//               {/* Table Header */}
//               <div className="hidden md:flex items-center gap-4 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-lg shadow-sm">
//                 <div className="w-6">
//                   <Checkbox
//                     checked={selectedProducts.length === sortedAndFilteredProducts.length}
//                     onCheckedChange={toggleAllProducts}
//                   />
//                 </div>
//                 <div className="w-48">Image</div>
//                 <div className="flex-1">Details</div>
//                 <div className="w-48">Actions</div>
//               </div>

//               {/* Product Cards */}
//               {sortedAndFilteredProducts.map((product) => (
//                 <Card
//                   key={product.id}
//                   className={`overflow-hidden transition-all hover:shadow-lg ${
//                     selectedProducts.includes(product.id) ? "border-primary shadow-md" : ""
//                   } ${product.bgColor}`}
//                 >
//                   <div className="flex flex-col md:flex-row md:items-center md:gap-4 p-4">
//                     <div className="md:w-6">
//                       <Checkbox
//                         checked={selectedProducts.includes(product.id)}
//                         onCheckedChange={() => toggleProductSelection(product.id)}
//                       />
//                     </div>
//                     {/* Image Section */}
//                     <div className="relative h-48 w-full md:h-24 md:w-48 group rounded-lg overflow-hidden bg-white">
//                       <Image
//                         src={product.image || "/placeholder.svg"}
//                         alt={product.name}
//                         fill
//                         className="object-cover transition-transform group-hover:scale-105"
//                       />
//                     </div>

//                     {/* Content Section */}
//                     <div className="flex-1 space-y-2 mt-4 md:mt-0">
//                       <div>
//                         <h3 className="font-semibold">{product.name}</h3>
//                         <p className="text-sm text-muted-foreground">{product.description}</p>
//                       </div>
//                       <div className="flex flex-wrap items-center gap-2">
//                         <Badge variant="secondary">{product.category}</Badge>
//                         <div className="flex items-center gap-1">
//                           <Tags className="h-3 w-3 text-muted-foreground" />
//                           {product.tags.map((tag, index) => (
//                             <Badge key={index} variant="outline" className="bg-white">
//                               {tag}
//                             </Badge>
//                           ))}
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Badge variant="outline" className="font-mono bg-white">
//                           {formatPrice(product.price)}
//                         </Badge>
//                         <div className="flex items-center gap-1">
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             className="h-6 px-2"
//                             onClick={() => handleQuickPriceUpdate(product.id, -100)}
//                           >
//                             -₹100
//                           </Button>
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             className="h-6 px-2"
//                             onClick={() => handleQuickPriceUpdate(product.id, 100)}
//                           >
//                             +₹100
//                           </Button>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Actions Section */}
//                     <div className="md:w-48 flex items-center gap-2 mt-4 md:mt-0">
//                       <Dialog>
//                         <DialogTrigger asChild>
//                           <Button variant="outline" size="sm" className="flex-1 md:flex-none bg-white">
//                             <Pencil className="h-4 w-4" />
//                             <span className="ml-2">Edit</span>
//                           </Button>
//                         </DialogTrigger>
//                         <DialogContent>
//                           <DialogHeader>
//                             <DialogTitle>Edit Product</DialogTitle>
//                             <DialogDescription>Make changes to the product details here.</DialogDescription>
//                           </DialogHeader>
//                           <div className="grid gap-4 py-4">
//                             <div className="grid gap-2">
//                               <Label htmlFor="name">Name</Label>
//                               <Input
//                                 id="name"
//                                 value={editingProduct?.name}
//                                 onChange={(e) =>
//                                   setEditingProduct(
//                                     editingProduct
//                                       ? {
//                                           ...editingProduct,
//                                           name: e.target.value,
//                                         }
//                                       : null,
//                                   )
//                                 }
//                               />
//                             </div>
//                             <div className="grid gap-2">
//                               <Label htmlFor="price">Price (₹)</Label>
//                               <Input
//                                 id="price"
//                                 type="number"
//                                 value={editingProduct?.price}
//                                 onChange={(e) =>
//                                   setEditingProduct(
//                                     editingProduct
//                                       ? {
//                                           ...editingProduct,
//                                           price: Number(e.target.value),
//                                         }
//                                       : null,
//                                   )
//                                 }
//                               />
//                             </div>
//                             <div className="grid gap-2">
//                               <Label htmlFor="category">Category</Label>
//                               <Input
//                                 id="category"
//                                 value={editingProduct?.category}
//                                 onChange={(e) =>
//                                   setEditingProduct(
//                                     editingProduct
//                                       ? {
//                                           ...editingProduct,
//                                           category: e.target.value,
//                                         }
//                                       : null,
//                                   )
//                                 }
//                               />
//                             </div>
//                             <div className="grid gap-2">
//                               <Label htmlFor="description">Description</Label>
//                               <Input
//                                 id="description"
//                                 value={editingProduct?.description}
//                                 onChange={(e) =>
//                                   setEditingProduct(
//                                     editingProduct
//                                       ? {
//                                           ...editingProduct,
//                                           description: e.target.value,
//                                         }
//                                       : null,
//                                   )
//                                 }
//                               />
//                             </div>
//                             <div className="grid gap-2">
//                               <Label htmlFor="tags">Tags (comma-separated)</Label>
//                               <Input
//                                 id="tags"
//                                 value={editingProduct?.tags.join(", ")}
//                                 onChange={(e) =>
//                                   setEditingProduct(
//                                     editingProduct
//                                       ? {
//                                           ...editingProduct,
//                                           tags: e.target.value.split(",").map((tag) => tag.trim()),
//                                         }
//                                       : null,
//                                   )
//                                 }
//                               />
//                             </div>
//                           </div>
//                           <DialogFooter>
//                             <Button onClick={() => editingProduct && handleSave(editingProduct)}>Save changes</Button>
//                           </DialogFooter>
//                         </DialogContent>
//                       </Dialog>
//                       <Button
//                         variant="destructive"
//                         size="sm"
//                         onClick={() => handleDelete(product.id)}
//                         className="flex-1 md:flex-none"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                         <span className="ml-2">Delete</span>
//                       </Button>
//                     </div>
//                   </div>
//                 </Card>
//               ))}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

