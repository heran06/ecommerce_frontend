import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const API = "https://ecommerce-backend-zpvu.onrender.com";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // 🔑 Listen for login / logout changes
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () =>
      window.removeEventListener("storage", handleStorageChange);
  }, []);

  const fetchCart = async () => {
    if (!token) {
      setCartItems([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const res = await fetch(`${API}/cart`, {
      headers: {
        Authorization: token
      }
    });
    const data = await res.json();
    setCartItems(data.items || []);
    setLoading(false);
  };

  // 🔑 AUTO REFRESH CART WHEN USER CHANGES
  useEffect(() => {
    fetchCart();
  }, [token]);

  const addToCart = async (productId) => {
    await fetch(`${API}/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ productId })
    });
    fetchCart();
  };

  const increaseQty = async (productId) => {
    await fetch(`${API}/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ productId })
    });
    fetchCart();
  };

  const decreaseQty = async (productId) => {
    await fetch(`${API}/cart/decrease`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ productId })
    });
    fetchCart();
  };

  const removeItem = async (productId) => {
    await fetch(`${API}/cart/remove`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ productId })
    });
    fetchCart();
  };

  const clearCart = async () => {
    await fetch(`${API}/cart/clear`, {
      method: "POST",
      headers: {
        Authorization: token
      }
    });
    fetchCart();
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        clearCart,
        refresh: fetchCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
