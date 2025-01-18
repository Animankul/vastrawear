import "@/styles/globals.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingBar from 'react-top-loading-bar';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";




export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user, setUser] = useState({value:null})
  const [key, setKey] = useState()
  const router = useRouter()
  const [progress, setProgress] = useState(0)

  // Function to calculate subtotal
  const calculateSubTotal = (myCart) => {
    let subt = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subt);
  };

  // Save cart to localStorage
  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart)); // Save as a string
    calculateSubTotal(myCart);
  };

  // Load cart from localStorage on page load
  useEffect(() => {

    router.events.on('routeChangeStart',()=>{
      setProgress(40)
     })
   router.events.on('routeChangeComplete',()=>{
    setProgress(100)
   })


    try {
      if (localStorage.getItem("cart")) {
        const loadedCart = JSON.parse(localStorage.getItem("cart"));
        setCart(loadedCart);
        calculateSubTotal(loadedCart);
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      localStorage.clear();
    }

    const token = localStorage.getItem('token')
    if(token){
     setUser({value:token}) 
     
    }
    setKey(Math.random())


  }, [router.query]);

  // Function to add item to the cart
  const addToCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = { ...cart }; // Create a new object reference
    if (itemCode in newCart) {
      newCart[itemCode].qty += qty;
    } else {
      newCart[itemCode] = { qty: qty, price, name, size, variant };
    }
    setCart(newCart);
    saveCart(newCart);
  };

  // Function to remove item from the cart
  const removeFromCart = (itemCode, qty) => {
    let newCart = { ...cart }; // Create a new object reference
    if (itemCode in newCart) {
      newCart[itemCode].qty -= qty;
      if (newCart[itemCode].qty <= 0) {
        delete newCart[itemCode];
      }
    }
    setCart(newCart);
    saveCart(newCart);
  };







  
const buyNow = (itemCode, qty, price, name, size, variant)=>{
 

 
  let newCart = {itemCode: {qty, price, name, size, variant}}; // Create a new object reference
 
  setCart(newCart);
  saveCart(newCart);
  
  router.push('/checkout')
};
    
  

  // Function to clear the cart
  const clearCart = () => {
    setCart({});
    saveCart({});
  };

const logout = ()=>{
  localStorage.removeItem("token")
  setUser({value:null})
  setKey(Math.random())
  router.push('/')
}


  return (



    <>
  <Head>
        <link rel="icon" href="/favicon.png" type="image/x-icon" />
        <title>Your Website Title</title>
      </Head>
         <LoadingBar color = '#f11946'
         waitingTime={400}
          progress={progress} onLoaderFinished={()=>
            setProgress(0)
          }>
          
         </LoadingBar>

     { key && <Navbar
      Logout={logout}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
        key={key}
        user={user}
      />}
      <Component buyNow={buyNow} {...pageProps} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />
      <Footer />
    </>
  );
}
