import React, { useState } from 'react'
import Link from 'next/link';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/Ai';
import { BsBagCheckFill } from 'react-icons/Bs';
import Head from 'next/head';
import Script from 'next/script';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';


function Checkout({ cart, addToCart, removeFromCart, subtotal }) {
  const router =useRouter();
  const [disabled, setdisabled] = useState(true);
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [address, setaddress] = useState('')
  const [phone, setphone] = useState('')
  const [city, setcity] = useState('')
  const [state, setstate] = useState('')
  const [pincode, setpincode] = useState('')

  const  onchange=(e)=>{
 
    if(e.target.name ==='name') {
      setname(e.target.value)
    }
    if(e.target.name ==='email') {
      setemail(e.target.value)
    }
    if(e.target.name ==='address') {
      setaddress(e.target.value)
    }
    if(e.target.name ==='phone') {
      setphone(e.target.value)
    }
    if(e.target.name ==='pincode') {
      setpincode(e.target.value)
    }
        
    if(name && email && address && phone && pincode){
      setdisabled(false);
    }
  }
  // const initiatetransaction = async () => {
  //   let orderId = Math.floor(Math.random() * Date.now());
  //   let data = { cart, subtotal, orderId, email: 'email' }
  //   const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   });
  //   let taxresponse = await response.json();
  //   let txnToken = taxresponse.txnToken;
  //   var config = {
  //     "root": "",
  //     "flow": "DEFAULT",
  //     "data": {
  //       "orderId": orderId, /* update order id */
  //       "token": txnToken, /* update token value */
  //       "tokenType": "TXN_TOKEN",
  //       "amount": subtotal /* update amount */
  //     },
  //     "handler": {
  //       "notifyMerchant": function (eventName, data) {
  //         console.log("notifyMerchant handler function called");
  //         console.log("eventName => ", eventName);
  //         console.log("data => ", data);
  //       }
  //     }
  //   };


  //   // initialze configuration using init method
  //   window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
  //     // after successfully updating configuration, invoke JS Checkout
  //     window.Paytm.CheckoutJS.invoke();
  //   }).catch(function onError(error) {
  //     console.log("error => ", error);
  //   });
  // }

  
  const initiatetransaction = async () => {
    let orderId = Math.floor(Math.random() * Date.now());
      const data={email,orderId,cart,subtotal,address};
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/initiatetransaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let order = await response.json();
    if(order.success){
      toast.success('Order Placed Successfully', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      
      setTimeout(() => {
        router.push( `${process.env.NEXT_PUBLIC_HOST}/order?id=${orderId}` );
      }, 2000);
    }
    else{
      toast.error(order.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    
  }
  return (
    <div className='mx-auto'>
       <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          />
      {/* <Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" /></Head> */}

      {/* <Script type="application/javascript" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`} crossorigin="anonymous"></Script> */}

      <h1 className='mx-auto text-3xl text-center mt-8 mb-3 font-bold'>Checkout</h1>
      <h2 className='leading-7 mx-8 p-2 text-lg'>1. Delivery Details</h2>
      <div className='flex flex-wrap mx-8'>
        <div className="px-2 mb-4 w-[100%] md:w-1/2">
          <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
          <input type="text" onChange={onchange} value={name} id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-maincolor focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="px-2 mb-4 w-[100%] md:w-1/2">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
          <input type="email" onChange={onchange} value={email} id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-maincolor focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
      </div>
      <div className="mx-8 px-2 mb-4 ">
        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Address</label>
        <textarea type="text" onChange={onchange} value={address} name="address" id="address" cols="30" rows="2" className="w-full bg-white rounded border border-gray-300 focus:border-maincolor focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
      </div>

      <div className='flex flex-wrap mx-8'>
        <div className="px-2 mb-4 w-[100%] md:w-1/2">
          <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
          <input type="text" onChange={onchange} value={phone} id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-maincolor focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="px-2 mb-4 w-[100%] md:w-1/2">
        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Pincode</label>
        <input type="text" onChange={onchange} value={pincode} id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-maincolor focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
      </div>
      <div className='flex flex-wrap mx-8'>
        <div className="px-2 mb-4 w-[100%] md:w-1/2">
          <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
          <input  value={state}  type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-maincolor focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly={true}/>
        </div>
        <div className="px-2 mb-4 w-[100%] md:w-1/2">
         
          <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
          <input type="text" value={city} id="text" name="text" className="w-full bg-white rounded border border-gray-300 focus:border-maincolor focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly={true} />
          
        </div>
      </div>
      <h2 className='leading-7 mx-8 p-2 text-lg'>2. Review Cart Items & Pay</h2>
      {/* CART */}
      <div className="text-black sidecart  py-5 px-5 pb-7  mx-10 border rounded-lg  bg-metal">



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
        <button disabled={disabled} onClick={initiatetransaction} className="flex disabled:bg-submaincolor text-white bg-maincolor border-0 py-2 px-4 focus:outline-none hover:bg-metal-300 my-5 mx-10 rounded text-base justify-center items-center "><BsBagCheckFill /><span className='mx-1'>Pay ₹{subtotal} </span> </button>

      </div>
    </div>

  )
}

export default Checkout