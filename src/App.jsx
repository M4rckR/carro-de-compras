/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Guitar } from "./Components/Guitar";
import { Header } from "./Components/Header";
import { db } from "./data/db";

export function App() {
  
  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  }

  const [data, setData] = useState(db);
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

 

  return (
    <>
      <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        vaciarCarrito={vaciarCarrito}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
        {data.map((guitar) => (
            <Guitar 
              key={guitar.id} 
              guitar={guitar} 
              addToCart={addToCart}
            />
        ))}
          {/* <Guitar />
          <Guitar />
          <Guitar />
          <Guitar />
          <Guitar />
          <Guitar />
          <Guitar />
          <Guitar /> */}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}
