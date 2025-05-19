
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, products } from '../data/mockData';
import { toast } from "@/components/ui/sonner";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemsCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  
  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart: CartItem[] = JSON.parse(savedCart);
        // Rehydrate product data from our products array
        const hydratedCart = parsedCart.map(item => ({
          ...item,
          product: products.find(p => p.id === item.productId) || item.product
        }));
        setCart(hydratedCart);
      } catch (error) {
        console.error("Error loading cart from storage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.productId === product.id);
      
      if (existingItem) {
        // If the item exists, update the quantity
        const newQuantity = existingItem.quantity + quantity;
        
        // Check inventory
        if (newQuantity > product.inventory) {
          toast.error("Cannot add more of this item (inventory limit)");
          return prevCart;
        }
        
        toast.success(`Updated quantity of ${product.name}`);
        return prevCart.map(item => 
          item.productId === product.id ? { ...item, quantity: newQuantity } : item
        );
      } else {
        // If the item doesn't exist, add it
        if (quantity > product.inventory) {
          toast.error("Cannot add that many items (inventory limit)");
          return prevCart;
        }
        
        toast.success(`${product.name} added to cart`);
        return [...prevCart, { productId: product.id, quantity, product }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => {
      const product = prevCart.find(item => item.productId === productId)?.product.name;
      if (product) {
        toast.info(`Removed ${product} from cart`);
      }
      return prevCart.filter(item => item.productId !== productId);
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => {
      const product = products.find(p => p.id === productId);
      
      if (!product) {
        return prevCart;
      }
      
      if (quantity > product.inventory) {
        toast.error("Cannot add that many items (inventory limit)");
        return prevCart;
      }
      
      return prevCart.map(item => 
        item.productId === productId ? { ...item, quantity } : item
      );
    });
  };

  const clearCart = () => {
    setCart([]);
    toast.info("Cart has been cleared");
  };

  const cartTotal = cart.reduce((total, item) => 
    total + (item.product.price * item.quantity), 0);

  const cartItemsCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      cartTotal,
      cartItemsCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
