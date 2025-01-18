import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiFillCloseCircle, AiFillMinusCircle, AiFillPlusCircle, AiOutlineShoppingCart } from "react-icons/ai";
import { BsFillBagCheckFill } from 'react-icons/bs';
import { MdAccountCircle } from 'react-icons/md';

const Navbar = ({Logout ,user, cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  const [cartVisible, setCartVisible] = useState(false); // Track cart visibility

  // Function to toggle cart visibility
  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

const [dropdown, setDropdown] = useState(false)

// const toggleDropdown=()=>{
// setDropdown(!dropdown)
// }












  // Function to stop event propagation to avoid closing the cart when interacting with cart buttons
  const stopEventPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-start justify-center my-2 shadow-xl items-center sticky top-0 bg-white z-10">
      <div className="logo mr-auto md:mx-5">
        <Link href={"/"}>
          <Image width={60} height={10} src="/logo2.png" alt="Logo" />
        </Link>
      </div>
      <div className="nav">
        <ul className="flex items-center space-x-6 font-bold md:text-md">
          <Link href={"/tshirts"}><li className="hover:text-pink-600">Tshirts</li></Link>
          <Link href={"/hoodies"}><li className="hover:text-pink-600">Hoodies</li></Link>
          <Link href={"/stickers"}><li className="hover:text-pink-600">Stickers</li></Link>
          <Link href={"/mugs"}><li className="hover:text-pink-600">Mugs</li></Link>
        </ul>
      </div>
      <div className="cart absolute items-center right-0 top-4 mx-5 cursor-pointer flex">
     <span onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}}>
     { dropdown && <div onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}} className="absolute right-8 top-6 rounded-md px-5 py-4 w-32 bg-pink-300">
      <ul>
     <Link href={'/myaccount'}>  <li className="py-1 hover:text-pink-700 text-sm">My Account</li></Link>
     <Link href={'/orders'}>   <li className="py-1 hover:text-pink-700 text-sm">Orders</li></Link>
        <li onClick={Logout} className="py-1 hover:text-pink-700 text-sm">Logout</li>    
        

      </ul>
     </div>}
     
     { user.value   && <MdAccountCircle  className="text-xl md:text-2xl mx-2"/>}
     </span>
     {!user.value &&<Link href={'/login'}>
      <button className="bg-pink-600 px-2 py-1 rounded-md text-sm text-white mx-2">Login</button>
      
      </Link>}
        <AiOutlineShoppingCart className="text-xl md:text-2xl" onClick={toggleCart} />
      </div>
      

      {/* Side Cart */}
      <div
        className={`h-[100vh] overflow-y-scroll w-72 sideCart absolute top-0 right-0 px-8 py-10 bg-pink-100 p-10 transform transition-transform ${cartVisible ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={toggleCart} // Close the cart when clicking outside
      >
        <div
          className="h-full"
          onClick={stopEventPropagation} // Stop propagation to prevent closing when interacting inside the cart
        >
          <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
          <span
            onClick={(e) => { // Close the cart when clicking the close button
              e.stopPropagation();
              toggleCart();
            }}
            className="absolute top-2 right-2 cursor-pointer text-2xl text-pink-500"
          >
            <AiFillCloseCircle />
          </span>
          <ol className="list-decimal font-semibold">
            {Object.keys(cart).length === 0 && (
              <div className="my-4 font-semibold">No items in the cart</div>
            )}
            {Object.keys(cart).map((k) => (
              <li key={k}>
                <div className="item flex my-5">
                  <div className="w-2/3 font-semibold">{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
                  <div className="flex font-semibold items-center justify-center w-1/3 text-lg">
                    <AiFillMinusCircle
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent cart from closing
                        removeFromCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                      className="cursor-pointer text-pink-500"
                    />
                    <span className="mx-2 text-sm">{cart[k].qty}</span>
                    <AiFillPlusCircle
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent cart from closing
                        addToCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                      className="cursor-pointer text-pink-500"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <div className="font-bold my-3">Subtotal :₹{subTotal}</div>
          <div className="flex">
            <Link href={'/checkout'}>
              <button
                disabled={Object.keys(cart).length === 0}
                className="flex mr-2 text-white  disabled:bg-pink-300 bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                <BsFillBagCheckFill className="m-1" /> Checkout
              </button>
            </Link>
            <button
            disabled={Object.keys(cart).length === 0}
              onClick={(e) => {
                e.stopPropagation(); // Prevent cart from closing
                clearCart();
              }}
              className="flex mr-2 text-white disabled:bg-pink-300 bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
