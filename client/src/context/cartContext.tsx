import { useState, createContext, useContext, useEffect } from "react";

interface CartItem {
  _id: string;
  images: string;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  discountPercentage: number;
  quantity: number;
}
interface CartContextType {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  clearCart: () => void;
}

type CartProviderProps = {
  children: React.ReactNode;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const exestingCartItem = localStorage.getItem("cart");
    if (exestingCartItem) {
      setCart(JSON.parse(exestingCartItem));
    }
  }, []);

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider value={{ cart, setCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
