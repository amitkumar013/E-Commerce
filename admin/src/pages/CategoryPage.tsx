import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, Search, X } from "lucide-react";
import toast from "react-hot-toast";

type Category = {
  _id: string;
  name: string;
  description: string;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const authData = localStorage.getItem("auth");
  const parsedAuth = authData ? JSON.parse(authData) : null;
  const token = parsedAuth?.data?.token;

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

  //-------------Create Categories-------------
  const handleCreateCategory = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/categorys/create-category",
        { name, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategories();
        setName("");
        setDescription("");
        setIsDialogOpen(false);
      } else {
        toast.error("Failed to create category");
      }
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  //-------------Update Categories-------------
  const handleUpdateCategory = async (e: any) => {
    e.preventDefault();
    if (!editingCategory?._id) {
      toast.error("Invalid category ID");
      return;
    }
    if (!editName.trim()) {
      toast.error("Category name is required");
      return;
    }
    try {
      const { data } = await axios.patch(
        `http://localhost:8000/api/v1/categorys/update-category/${editingCategory._id}`,
        { name: editName, description: editDescription },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data?.success) {
        toast.success("Category is updated");
        getAllCategories();
        setEditingCategory(null);
        setEditName("");
        setEditDescription("");
        setIsDialogOpen(false);
      } else {
        toast.error("Failed to update category");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  //-------------Delete Categories-------------
  const handleDeleteCategory = async (id: string) => {
    try {
      const { data } = await axios.delete(`${"http://localhost:8000/api/v1/categorys/delete-category"}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data?.success) {
        toast.success(`${name} category deleted`);
        setCategories(categories.filter((category) => category._id !== id));
      } else {
        toast.error("Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  //------------Search Filter------------------
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Categories</h1>

      {/* TODO: Search Category */}
      <div className="relative w-full sm:w-64 mb-4">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* TODO: Create & Update Category Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Category
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Edit Category" : "Add New Category"}
            </DialogTitle>
          </DialogHeader>

          {/* TODO: Input field for category name */}
          <div className="grid gap-4 py-4">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={editingCategory ? editName : name}
              onChange={(e) =>
                editingCategory
                  ? setEditName(e.target.value)
                  : setName(e.target.value)
              }
            />
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={editingCategory ? editDescription : description}
              onChange={(e) =>
                editingCategory
                  ? setEditDescription(e.target.value)
                  : setDescription(e.target.value)
              }
            />
          </div>

          <DialogFooter>
            {/* TODO: Create new category or update existing category */}
            <Button
              onClick={
                editingCategory ? handleUpdateCategory : handleCreateCategory
              }
            >
              {editingCategory ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* TODO: Display list of categories */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredCategories.map((category) => (
            <TableRow key={category._id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.description}</TableCell>
              <TableCell>
                Edit
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    console.log("Editing category set to:", category);
                    setEditingCategory(category);
                    setEditName(category.name);
                    setEditDescription(category.description);
                    setIsDialogOpen(true);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                Delete
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteCategory(category._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
