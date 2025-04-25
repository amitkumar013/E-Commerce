import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { useSearch } from "@/context/searchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FormEvent } from "react";

interface SearchBarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

export function SearchBar({ isMobile = false, onClose }: SearchBarProps) {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const URI = import.meta.env.VITE_BACKEND_URL;

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!values.keyword.trim()) return;
  
    try {
      const { data } = await axios.get(
        `${URI}/api/v1/products/search/${values.keyword}`
      );
      setValues({ ...values, results: data, keyword: "" });
      console.log("Search results:", data);
      navigate("/search-results", { state: { results: data } });
      if (onClose) onClose();
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, keyword: e.target.value });
  };

  const inputElement = (
    <Input
      type="text"
      placeholder="Search products"
      value={values.keyword}
      onChange={handleInputChange}
      className="w-full"
    />
  );

  const searchButton = isMobile ? (
    <Button size="icon" type="button" onClick={onClose}>
      <X className="h-5 w-5" />
    </Button>
  ) : (
    <Button size="icon" type="submit">
      <Search className="h-4 w-4" />
    </Button>
  );
  

  return (
    <form onSubmit={handleSearch}>
      {isMobile ? (
        <div className="md:hidden px-4 py-2 bg-gray-100 flex items-center space-x-2">
          {inputElement}
          {searchButton}
        </div>
      ) : (
        <div className="mr-40 hidden md:flex items-center space-x-3 w-full max-w-md mx-auto">
          {inputElement}
          {searchButton}
        </div>
      )}
    </form>
  );
}
