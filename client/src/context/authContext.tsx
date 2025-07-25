import { useContext, createContext, useState, useEffect } from "react";

interface AuthContextType {
  auth: {
    user: any;
    token: string;
  };
  setAuth: React.Dispatch<React.SetStateAction<{ user: any; token: string }>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type UserProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: UserProviderProps) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      try {
        const parseData = JSON.parse(data);
        setAuth({
          user: parseData?.user || null,
          token: parseData?.token || "",
        });
      } catch (error) {
        console.error("Error parsing auth data:", error);
        setAuth({ user: null, token: "" });
      }
    }
  }, []);
  
  

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };

