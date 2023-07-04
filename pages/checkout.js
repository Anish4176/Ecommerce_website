import React from 'react'
import Link from 'next/link';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/Ai';
import { BsBagCheckFill } from 'react-icons/Bs';

function Checkout({ cart, addToCart, removeFromCart, subtotal }) {
  return (
    <div className='mx-auto'>
      <h1 className='mx-auto text-3xl text-center mt-8 mb-3 font-bold'>Checkout</h1>
      <h2 className='leading-7 mx-8 p-2 text-lg'>1. Delivery Details</h2>
      <div className='flex flex-wrap mx-8'>
        <div className="px-2 mb-4 w-[100%] md:w-1/2">
          <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
          <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-maincolor focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="px-2 mb-4 w-[100%] md:w-1/2">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
          <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-maincolor focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
      </div>
      <div className="mx-8 px-2 mb-4 ">
        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Address</label>
        <textarea type="text" name="address" id="address" cols="30" rows="2" className="w-full bg-white rounded border border-gray-300 focus:border-maincolor focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
      </div>

      <div className='flex flex-wrap mx-8'>
        <div className="px-2 mb-4 w-[100%] md:w-1/2">
          <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
          <input type="text" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-maincolor focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="px-2 mb-4 w-[100%] md:w-1/2">
          <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
          <input type="text" id="text" name="text" className="w-full bg-white rounded border border-gray-300 focus:border-maincolor focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
      </div>
      <div className='flex flex-wrap mx-8'>
        <div className="px-2 mb-4 w-[100%] md:w-1/2">
          <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
          <input type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-maincolor focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="px-2 mb-4 w-[100%] md:w-1/2">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">Pincode</label>
          <input type="text" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-maincolor focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
      </div>
      <h2 className='leading-7 mx-8 p-2 text-lg'>2. Review Cart Items & Pay</h2>
      {/* CART */}
      <div  className="text-black sidecart  py-5 px-5 pb-7  mx-10 border rounded-lg  bg-metal">
           
    

            {Object.keys(cart).length == 0 &&
              <div className='my-4'>Your cart is Empty!</div>
            }
            <ol className='flex-col justify-center items-center '>
              {Object.keys(cart).map((k) => {
                return <li key={k}>
                  <div className='flex space-x-5 my-3'>
                    <div className='w-2/3 text-xl font-medium'>{cart[k].name} </div>
                    <div className='w-1/3 flex justify-end items-center text-maincolor text-xl cursor-pointer'><AiFillMinusCircle onClick={() => { removeFromCart(k, 1, 499, cart[k].name, cart[k].variant, cart[k].size) }} /> <span className='mx-2'>{cart[k].qty}</span > <AiFillPlusCircle onClick={() => { addToCart(k, 1, 499, cart[k].name, cart[k].variant, cart[k].size) }} /></div>
                  </div>

                </li>
              })}
            </ol>
            <p className='font-bold mt-5'>Subtotal: ₹{subtotal} </p>
            
          </div>
          <div className='flex'>
              <Link href={'/orders'}> <button className="flex  text-white bg-maincolor border-0 py-2 px-4 focus:outline-none hover:bg-metal-300 my-5 mx-10 rounded text-base justify-center items-center "><BsBagCheckFill /><span className='mx-1'>Pay ₹{subtotal} </span> </button> </Link>
              
            </div>
    </div>

  )
}

export default Checkout