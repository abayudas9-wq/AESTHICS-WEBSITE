import { createContext, useState } from "react";

export const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (product: any) => {
    const exist = cart.find((i) => i.id === product.id);
    if (exist) {
      setCart(
        cart.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (id: number) =>
    setCart(cart.filter((i) => i.id !== id));

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, total }}>
      {children}
    </CartContext.Provider>
  );
};
