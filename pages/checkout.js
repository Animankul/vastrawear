import Head from "next/head";
import Script from "next/script";
import { useState } from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";

const Checkout = ({ subTotal, cart, clearCart, addToCart, removeFromCart }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);


const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [phone, setPhone] = useState("")
const [pincode, sePincode] = useState("")
const [address, setAddress] = useState("")
const [city, setCity] = useState("")
const [state, setState] = useState("")
const [disabled, setDisabled] = useState(true)
const handleChange = async(e)=>{



  if(e.target.name == 'name'){
    setName(e.target.value)
  }else if(e.target.name == 'email'){
    setEmail(e.target.value)
  }else if(e.target.name == 'phone'){
    setPhone(e.target.value)
  }else if(e.target.name == 'address'){
    setAddress(e.target.value)
  }else if(e.target.name == 'pincode'){
    sePincode(e.target.value)
    if(e.target.value.length == 6){

      let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
      let pinJson = await pins.json()
      if(Object.keys(pinJson).includes(e.target.value)){
        setState(pinJson[e.target.value][1])
        setCity(pinJson[e.target.value][0])
      }else{
        setState('');
        setCity('');
      }
    }else{
      setState('');
      setCity('');
    }

  
  }
  if(name.length>3 && email.length>3 && phone.length>3 && address.length>3 && pincode.length>3){
    setDisabled(false)
  }else{
    setDisabled(true)
  }
}
       





  const initiatePayment = async () => {
    if (!window.Paytm || !window.Paytm.Checkout) {
      console.error("Paytm Checkout script not loaded.");
      return;
    }

    let oid = Math.floor(Math.random() * Date.now());
    const data = { cart, subTotal, oid, email: "email" };

    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let txnRes = await a.json();
    console.log(txnRes);
    let txnToken = txnRes.txnToken;

    var config = {
      root: "",
      flow: "DEFAULT",
      data: {
        orderId: oid,
        token: txnToken,
        tokenType: "TXN_TOKEN",
        amount: subTotal,
      },
      handler: {
        notifyMerchant: (eventName, data) => {
          console.log("Merchant Notification:", eventName, data);
        },
      },
    };

    window.Paytm.Checkout.init(config).then(function onSuccess() {
      window.Paytm.CheckoutJS.invoke();
    }).catch(function onError(error) {
      console.log("error=>", error);
    });
  };

  return (
    <div className="container px-2 sm:m-auto">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {/* Load Paytm Checkout script */}
      <Script
        type="application/javascript"
        crossOrigin="anonymous"
        src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgui/checkout.js/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}

        onLoad={() => setScriptLoaded(true)}  // Set scriptLoaded to true when the script is loaded
      />

      <h1 className="font-bold text-3xl my-8 text-center">Checkout</h1>
      {/* Delivery details */}
      <h2 className="font-bold text-xl">1. Delivery Details</h2>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Enter your name
            </label>
            <input
            onChange={handleChange}
            value={name}
              type="text"
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Enter your email
            </label>
            <input
             onChange={handleChange}
             value={email}
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="px-2 w-full">
        <div className="mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">
            Enter your address
          </label>
          <textarea
             onChange={handleChange}
          value={address}
            id="address"
            name="address"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
         
        </div>
      </div>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
              Enter your phone
            </label>
            <input
             onChange={handleChange}
             value={phone}
              type="text"
              id="phone"
              name="phone"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">
              Pincode
            </label>
            <input
             onChange={handleChange}
             value={pincode}
              type="text"
              id="pincode"
              name="pincode"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>

      
      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">
              District
            </label>
            <input
             onChange={handleChange}
            value={city}
              type="text"
              id="city"
              name="city"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
               />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">
              State
            </label>
            <input
            onChange={handleChange}
            value={state}
              type="text"
              id="state"
              name="state"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>

      {/* Cart Review */}
      <h2 className="font-semibold text-xl">2. Review Cart Items & Pay</h2>
      <div className="sideCart px-8 bg-pink-100 p-8 m-2">
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length === 0 && <div className="my-4 font-semibold">No items in the cart</div>}
          {Object.keys(cart).map((k) => (
            <li key={k}>
              <div className="item flex my-5">
                <div className="font-semibold">
                  {cart[k].name} ({cart[k].size}/{cart[k].variant})
                </div>
                <div className="flex font-semibold items-center justify-center w-1/3 text-lg">
                  <AiFillMinusCircle
                    onClick={() =>
                      removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)
                    }
                    className="cursor-pointer text-pink-500"
                  />
                  <span className="mx-2 text-sm">{cart[k].qty}</span>
                  <AiFillPlusCircle
                    onClick={() =>
                      addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)
                    }
                    className="cursor-pointer text-pink-500"
                  />
                </div>
              </div>
            </li>
          ))}
        </ol>
        <span className="font-bold">Subtotal: ₹{subTotal}</span>
      </div>
      <div className="mx-4">
        <button
          onClick={initiatePayment}
          className="flex mr-2 text-white disabled:bg-pink-300 bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          disabled={disabled}  // Disable the button until the script is loaded
        >
          <BsFillBagCheckFill className="m-1" /> Pay ₹{subTotal}
        </button>
      </div>
    </div>
  );
};

export default Checkout;