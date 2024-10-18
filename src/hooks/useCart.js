import { useMemo } from "react";
import { useEffect, useState } from "react";
import {db} from '../data/db';

export const useCart = () => {
    const initialCart = () => {
        const localStorageCart = localStorage.getItem("cart");
        return localStorageCart ? JSON.parse(localStorageCart) : [];
      }
    
      const [data] = useState(db);
      const [cart, setCart] = useState(initialCart);
    
     const MAX_ITEMS = 10;
    
    
     useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cart));
     }, [cart]);
    
    
      function removeFromCart(id) {
        setCart(prevCart => prevCart.filter((guitar) => guitar.id !== id));
      }
    
      function increaseQuantity(id) {
        const updatedCart = cart.map((guitar) => {
          if (guitar.id === id  && guitar.quantity < MAX_ITEMS) {
            return {
              ...guitar,
              quantity: guitar.quantity + 1,
            }; 
          }
          return guitar;
        });
        setCart(updatedCart);
    
      }
    
      function addToCart(item) {
        const itemExist = cart.findIndex((guitar) => guitar.id === item.id);
        if (itemExist >= 0) {
          const updatedCart = [...cart];
          updatedCart[itemExist].quantity++;
          setCart(updatedCart);
          
        } else {
          item.quantity = 1;
          setCart(prevCart => [...prevCart, item]);
        }
      }
    
      function decreaseQuantity(id) {
        const updatedCart = cart.map((guitar) => {
          if (guitar.id === id && guitar.quantity > 1) {
            return {
              ...guitar,
              quantity: guitar.quantity - 1,
            };
          }
          return guitar;
        });
        setCart(updatedCart);
      }
    
      function vaciarCarrito() {
        setCart([]);
      }
      

      const isEmpty = useMemo(() => cart.length === 0, [cart]);
      const carTotal = useMemo(() => cart.reduce((total, item) => total + (item.price * item.quantity), 0), [cart]);
    

    return {data, cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, vaciarCarrito, isEmpty, carTotal};
}

