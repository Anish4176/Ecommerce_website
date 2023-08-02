import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { BsBagCheckFill } from 'react-icons/bs';
import Head from 'next/head';
import Script from 'next/script';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


function Checkout({ isdark, cart, clearCart, addToCartincheckout, addToCart, removeFromCart, subtotal }) {
  const router = useRouter();
  const [disabled, setdisabled] = useState(true);
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [address, setaddress] = useState('')
  const [phone, setphone] = useState('')
  const [city, setcity] = useState('')
  const [state, setstate] = useState('')
  const [pincode, setpincode] = useState('')
  const [user, setuser] = useState({ value: null })
  const [service, setservice] = useState(null)
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('USER'));

    if (user) {
      setuser(user)
      setemail(user.email)
      fetchuser(user.token)
      if (name && email && address && phone && pincode) {
        setdisabled(false);
      }

    }
    else {
      router.push('/login');
    }


  }, [])

  const fetchuser = async (token) => {
    const data = token;
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setOpen(true);
    let res = await response.json();
    setOpen(true);
    setname(res.name);
    setaddress(res.address);
    setphone(res.phone);
    getpincode(res.pincode);

  }

  const getpincode = async (pin) => {
    setpincode(pin)
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    setOpen(true);
    const checkpin = await response.json();
    setOpen(false);
    pin = pin.trim();
    if (Object.keys(checkpin).includes(pin)) {
      setservice(true);
      setcity(checkpin[pin][0]);
      setstate(checkpin[pin][1]);
      setdisabled(false);

    }
    else {
      setservice(false);

      setcity('');
      setstate('');
    }
  }
  const onchange = async (e) => {

    if (e.target.name === 'name') {
      setname(e.target.value)
    }
    if (e.target.name === 'email') {
      setemail(e.target.value)
    }
    if (e.target.name === 'address') {
      setaddress(e.target.value)
    }
    if (e.target.name === 'phone') {
      setphone(e.target.value)
    }
    if (e.target.name === 'pincode') {
      let pinc = e.target.value
      pinc = pinc.trim();
      setpincode(pinc);
      if (pinc.length == 6) {
        getpincode(e.target.value);
      }
      else {
        setservice(null);

        setcity('');
        setstate('');
      }
    }

    if (name && email && address && phone && pincode) {
      setdisabled(false);
    }
  }



  const initiatetransaction = async (e) => {
    e.preventDefault();
    if (subtotal > 0) {

      let orderId = Math.floor(Math.random() * Date.now());
      const data = { name, email, orderId, cart, subtotal, address, phone, pincode };
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/initiatetransaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setOpen(true);
      let order = await response.json();
      setOpen(false);
      if (order.success) {
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
          clearCart();
          router.push(`${process.env.NEXT_PUBLIC_HOST}/order?id=${orderId}`);
        }, 2000);
      }
      else {
        if (order.clearcart == true) {
          clearCart();
        }

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
    else {
      toast.error('Your cart is empty!', {
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
      <Backdrop
        sx={{ backgroundColor: '#FFFFFF',marginTop:'5rem', color: '#783AB1', zIndex: (theme) => theme.zIndex.drawer + 1}}
        open={open}
        
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
        <title>Checkout - Techwearonline</title>
      </Head>

      <form action="#" onSubmit={initiatetransaction}>
        <div className={` ${isdark ? 'bg-darkgreyish' : 'bg-white'} ${isdark ? 'text-white' : 'text-black'}`}>
          <h1 style={{ fontFamily: 'Bitter' }} className={` mx-auto text-3xl text-center pt-8  mb-3 font-bold`}>Checkout</h1>
          <h2 className='leading-7 mx-8 p-2 text-lg'>1. Delivery Details</h2>
          <div className='flex flex-wrap mx-8'>
            <div className="px-2 mb-4 w-[100%] md:w-1/2">
              <label htmlFor="name" className="leading-7 text-sm ">Name</label>
              <input type="text" onChange={onchange} value={name} id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-maincolor focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required />
            </div>
            <div className="px-2 mb-4 w-[100%] md:w-1/2">
              <label htmlFor="email" className="leading-7 text-sm ">Email</label>
              {user && user.email ?
                <input type="email" value={user.email} id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-maincolor focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly />
                :
                <input type="email" onChange={onchange} value={email} id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-maincolor focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              }
            </div>
          </div>
          <div className="mx-8 px-2 mb-4 ">
            <label htmlFor="email" className="leading-7 text-sm ">Address</label>
            <textarea type="text" onChange={onchange} value={address} name="address" id="address" cols="30" rows="2" className="w-full bg-white rounded border border-gray-300 focus:border-maincolor focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required></textarea>
          </div>

          <div className='flex flex-wrap mx-8'>
            <div className="px-2 mb-4 w-[100%] md:w-1/2">
              <label htmlFor="phone" className="leading-7 text-sm ">Phone</label>
              <input placeholder='Enter your 10 digit phone number' type="text" onChange={onchange} value={phone} id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-maincolor focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required />
            </div>
            <div className="px-2  w-[100%] md:w-1/2 mb-3">
              <label htmlFor="email" className="leading-7 text-sm ">Pincode</label>
              <input placeholder='e.g. 226001' type="text" onChange={onchange} value={pincode} id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-maincolor focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3  leading-8 transition-colors duration-200 ease-in-out" required />
              {(service && service != null) && <div className='text-green-600 '>Yay! This pincode is serviceable</div>}
              {(!service && service != null) && <div className='text-red-600 '>Sorry! We do not deliver to this pincode yet</div>}
            </div>
          </div>
          <div className='flex flex-wrap mx-8'>
            <div className="px-2 mb-4 w-[100%] md:w-1/2">
              <label htmlFor="state" className="leading-7 text-sm ">State</label>
              <input onChange={onchange} value={state} type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-maincolor focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="px-2 mb-4 w-[100%] md:w-1/2">

              <label htmlFor="city" className="leading-7 text-sm ">District</label>
              <input type="text" onChange={onchange} value={city} id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-maincolor focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />

            </div>
          </div>
          <h2 className='leading-7 mt-5 mx-8 p-2 text-lg'>2. Review Cart Items & Pay</h2>
          {/* CART */}
          <div className="text-black sidecart  py-5 px-5 pb-7  mx-10 border rounded-lg  bg-metal">



            {Object.keys(cart).length == 0 &&
              <div className='my-4'>Your cart is Empty!</div>
            }
            <ol className='flex-col justify-center items-center '>
              {Object.keys(cart).map((k) => {
                return <li key={k}>
                  <div className='flex space-x-5 my-3'>
                    <div className='w-2/3 md:text-xl text-lg font-medium'>{cart[k].name} ({cart[k].variant} / {cart[k].size})</div>
                    <div className='w-1/3 flex justify-end items-center text-maincolor text-xl cursor-pointer'><AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].variant, cart[k].size) }} /> <span className='mx-2'>{cart[k].qty}</span > <AiFillPlusCircle onClick={() => { addToCartincheckout(k, 1, cart[k].price, cart[k].name, cart[k].variant, cart[k].size) }} /></div>
                  </div>

                </li>
              })}
            </ol>
            <p className='font-bold mt-5'>Subtotal: ₹{subtotal} </p>

          </div>
          <div className=' pb-9 mt-5'>
            <input className='ml-10' type="checkbox" name="vehicle1" value="Bike"required/>
              <label className='mx-2' for="vehicle1">Place a Cash on Delivery Order</label>
                <button type="submit" disabled={disabled} className="flex disabled:bg-submaincolor text-white bg-maincolor border-0 py-2 px-4 focus:outline-none hover:bg-metal-300  mb-5 mt-2 mx-10 rounded text-base justify-center items-center "><BsBagCheckFill /><span className='mx-1'>Pay ₹{subtotal} </span> </button>

              </div>
          </div>
      </form>
    </div>
  )
}

export default Checkout