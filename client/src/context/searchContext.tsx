import { useContext, createContext, useState } from "react";

const SearchContext = createContext<any>(null);

const SearchProvider = ({ children }: any) => {
  const [search, setSearch] = useState<{ keyword: string; results: any[] }>({
    keyword: "",
    results: [],
  });

  return (
    <SearchContext.Provider value={[search, setSearch]}>
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
