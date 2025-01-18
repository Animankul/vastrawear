import mongoose from "mongoose";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Order from "../models/Orders"; // Rename the imported model

const Orders = ({ orders }) => {
const router = useRouter()
useEffect(() => {

    if(!localStorage.getItem('token')){
        router.push('/')
    }

  
}, [])

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-6">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <h1 className="font-bold text-2xl text-center mb-6">My Orders</h1>
                <table className="min-w-full text-left text-sm font-light text-black">
                  <thead className="border-b border-neutral-200 font-medium">
                    <tr>
                      <th scope="col" className="px-6 py-4">#</th>
                      <th scope="col" className="px-6 py-4">First</th>
                      <th scope="col" className="px-6 py-4">Last</th>
                      <th scope="col" className="px-6 py-4">Handle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr className="border-b border-neutral-200" key={index}>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                        <td className="whitespace-nowrap px-6 py-4">{order.firstName}</td>
                        <td className="whitespace-nowrap px-6 py-4">{order.lastName}</td>
                        <td className="whitespace-nowrap px-6 py-4">{order.handle}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  // Fetch orders from the database
  let orders = await Order.find({});

  return {
    props: {
      orders: orders
    },
  };
}

export default Orders;
