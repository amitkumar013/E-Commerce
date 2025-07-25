import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface FilterProps {
  categories: string[];
  brands: string[];
  priceRanges: { label: string; min: number; max: number }[];
  selectedCategories: string[];
  selectedBrands: string[];
  selectedPrice: { min: number; max: number } | null;
  onCategoryChange: (category: string) => void;
  onBrandChange: (brand: string) => void;
  onPriceChange: (range: { min: number; max: number } | null) => void;
  resetFilters: () => void;
}

export default function Filters({
  categories,
  brands,
  priceRanges,
  selectedCategories,
  selectedBrands,
  selectedPrice,
  onCategoryChange,
  onBrandChange,
  onPriceChange,
  resetFilters,
}: FilterProps) {
  return (
    <aside className="w-full md:w-1/4 bg-white p-4 shadow-md rounded-lg mt-2">
      <div className="md:hidden flex justify-between gap-2 mb-1">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary" className="bg-white">Category</Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 bg-white">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategories.includes(category) ? "default" : "outline"}
                onClick={() => onCategoryChange(category)}
                className="block w-full mb-2"
              >
                {category}
              </Button>
            ))}
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary" className="bg-white">Brand</Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 bg-white">
            {brands.map((brand) => (
              <Button
                key={brand}
                variant={selectedBrands.includes(brand) ? "default" : "outline"}
                onClick={() => onBrandChange(brand)}
                className="block w-full mb-2"
              >
                {brand}
              </Button>
            ))}
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary" className="bg-white">Price</Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 bg-white">
            {priceRanges.map((range, index) => (
              <Button
                key={index}
                variant={selectedPrice?.min === range.min && selectedPrice?.max === range.max ? "default" : "outline"}
                onClick={() => onPriceChange(range)}
                className="block w-full mb-2"
              >
                {range.label}
              </Button>
            ))}
          </PopoverContent>
        </Popover>
      </div>

      {/* Desktop Filters */}
      <div className="hidden md:block">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>

        <h3 className="text-md font-semibold mb-2">Filter by Category</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category} className="flex items-center">
              <input
                type="checkbox"
                id={category}
                checked={selectedCategories.includes(category)}
                onChange={() => onCategoryChange(category)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor={category} className="ml-2 text-gray-700 cursor-pointer">
                {category}
              </label>
            </li>
          ))}
        </ul>

        <h3 className="text-md font-semibold mt-4 mb-2">Filter by Price Range</h3>
        <ul className="space-y-2">
          {priceRanges.map((range, index) => (
            <li key={index} className="flex items-center">
              <input
                type="radio"
                name="price"
                id={`price-${index}`}
                checked={selectedPrice?.min === range.min && selectedPrice?.max === range.max}
                onChange={() => onPriceChange(range)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor={`price-${index}`} className="ml-2 text-gray-700 cursor-pointer">
                {range.label}
              </label>
            </li>
          ))}
        </ul>

        <h3 className="text-md font-semibold mt-4 mb-2">Filter by Brand</h3>
        <ul className="space-y-2">
          {brands.map((brand) => (
            <li key={brand} className="flex items-center">
              <input
                type="checkbox"
                id={brand}
                checked={selectedBrands.includes(brand)}
                onChange={() => onBrandChange(brand)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor={brand} className="ml-2 text-gray-700 cursor-pointer">
                {brand}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={resetFilters} className="mt-4 w-full bg-red-600 text-white p-2 rounded-sm">
        Reset Filters
      </button>
    </aside>
  );
}
