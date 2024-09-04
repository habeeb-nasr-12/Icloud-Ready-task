"use client";
import {
  useState,
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  kitchen: CartItem[];
  addToCart: (item: CartItem) => void;
  clearCart: () => void;
  openCart: boolean;
  openCloseCart: () => void;
  cartOrKitchen: string;
  moveToKitchen: () => void;
  setCartOrkitchen: (value: string) => void;
  removeFromCart: (item: CartItem) => void;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

const cartReducer = (state: CartItem[], action: any): CartItem[] => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItemIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex !== -1) {
        return state.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...state, { ...action.payload, quantity: 1 }];

    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload.id);

    case "INCREMENT_QUANTITY":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

    case "DECREMENT_QUANTITY":
      return state.map((item) =>
        item.id === action.payload.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], () =>
    JSON.parse(localStorage.getItem("cart") || "[]")
  );

  const [openCart, setOpenCart] = useState(false);

  const addToCart = (item: CartItem) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const removeFromCart = (item: CartItem) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item });
  };

  const incrementQuantity = (id: number) => {
    dispatch({ type: "INCREMENT_QUANTITY", payload: { id } });
  };

  const decrementQuantity = (id: number) => {
    dispatch({ type: "DECREMENT_QUANTITY", payload: { id } });
  };

  const openCloseCart = () => {
    setOpenCart(!openCart);
  };

  const [kitchen, setKitchen] = useState<CartItem[]>([]);
  const [cartOrKitchen, setCartOrkitchen] = useState<string>("");
  const [openKitchen, setOpenKitchen] = useState<boolean>(false);

  const moveToKitchen = () => {
    setCartOrkitchen("kitchen");
    openCloseCart();
    setOpenCart(true);
    setKitchen((prevKitchen) => [...prevKitchen, ...cart]);
    clearCart();
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        kitchen,
        addToCart,
        clearCart,
        openCart,
        openCloseCart,
        cartOrKitchen,
        setCartOrkitchen,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        moveToKitchen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
