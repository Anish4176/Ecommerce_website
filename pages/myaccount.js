import React, { useState, useEffect } from 'react'
import Head from 'next/head';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Checkout({ isdark, cart, clearCart, addToCartincheckout, addToCart, removeFromCart, subtotal }) {
  const router = useRouter();

  const [name, setname] = useState('')
  const [address, setaddress] = useState('')
  const [phone, setphone] = useState('')
  const [pincode, setpincode] = useState('')
  const [password, setpassword] = useState('')
  const [newpassword, setnewpassword] = useState('')
  const [confirmnewpassword, setconfirmnewpassword] = useState('')
  const [user, setuser] = useState({ token: '', email: '' })
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const userdetail = JSON.parse(localStorage.getItem('USER'));
    if (!userdetail) {
      router.push('/');
    }
    else {
      setuser({ token: userdetail.token, email: userdetail.email })
      fetchuser(userdetail.token);


    }


  }, [])

  const fetchuser = async (token) => {
    const data = token;
    setOpen(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
   
    let res = await response.json();
    setOpen(false);
    setname(res.name);
    setaddress(res.address);
    setphone(res.phone);
    setpincode(res.pincode);

  }

  const handleupdate = async () => {
    const data = { token: user.token, name, address, phone, pincode };
    setOpen(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    let res = await response.json();
    setOpen(false);
    if (res.success) {

      toast.success('Updated Successfully', {
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
  const handleupdatepassword = async () => {

    if (newpassword === confirmnewpassword) {
      const data = { token: user.token, newpassword, password };
      setOpen(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      let res = await response.json();
      setOpen(false);
      if (res.success) {
        toast.success('Updated Successfully', {
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
      else {
        toast.error(res.error, {
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
      toast.error('Password Not Matching', {
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

    setpassword('')
    setnewpassword('')
    setconfirmnewpassword('')
  }


  const onchange = async (e) => {

    if (e.target.name === 'name') {
      setname(e.target.value)
    }

    if (e.target.name === 'address') {
      setaddress(e.target.value)
    }
    if (e.target.name === 'phone') {
      setphone(e.target.value)
    }
    if (e.target.name === 'pincode') {
      setpincode(e.target.value)

    }
    if (e.target.name === 'password') {
      setpassword(e.target.value)

    }
    if (e.target.name === 'newpassword') {
      setnewpassword(e.target.value)

    }
    if (e.target.name === 'confirmnewpassword') {
      setconfirmnewpassword(e.target.value)

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
        sx={{ backgroundColor: '#FFFFFF', marginTop: '5rem', color: '#783AB1', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}

      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
        <title>My Account | Techwearonline</title>
      </Head>
      <div className={` ${isdark ? 'bg-darkgreyish' : 'bg-white'} ${isdark ? 'text-white' : 'text-black'}`}>
        <h1 className='mx-auto text-3xl text-center pt-8 mb-3 font-bold'>My Account</h1>
        <h2 className='leading-7 mx-8 p-2 text-lg'>1.Default Delivery Details</h2>
        <div className='flex flex-wrap mx-8'>
          <div className="px-2 mb-4 w-[100%] md:w-1/2">
            <label htmlFor="name" className="leading-7 text-sm ">Name</label>
            <input type="text" onChange={onchange} value={name} id="name" name="name" className="w-full  bg-white rounded border border-gray-300 focus:border-maincolor focus:ring-2 focus:ring-maincolor text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="px-2 mb-4 w-[100%] md:w-1/2">
            <label htmlFor="email" className="leading-7 text-sm ">Email (cannot be updated)</label>
            <input type="email" value={user.email} id="email" name="email" className="w-full  bg-white rounded border border-gray-300 focus:border-maincolor focus:ring-2 focus:ring-maincolor text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly />
          </div>
        </div>
        <div className="mx-8 px-2 mb-4 ">
          <label htmlFor="email" className="leading-7 text-sm ">Address</label>
          <textarea type="text" onChange={onchange} value={address} name="address" id="address" cols="30" rows="2" className="w-full outline-none bg-white rounded border border-gray-300 focus:border-maincolor focus:ring-2 focus:ring-maincolor text-base  text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
        </div>

        <div className='flex flex-wrap mx-8'>
          <div className="px-2 mb-4 w-[100%] md:w-1/2">
            <label htmlFor="phone" className="leading-7 text-sm ">Phone</label>
            <input placeholder='Enter your 10 digit phone number' type="text" onChange={onchange} value={phone} id="phone" name="phone" className="w-full  bg-white rounded border border-gray-300 focus:border-maincolor focus:ring-2 focus:ring-maincolor text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="px-2  w-[100%] md:w-1/2 mb-3">
            <label htmlFor="email" className="leading-7 text-sm ">Pincode</label>
            <input placeholder='e.g. 226001' type="text" onChange={onchange} value={pincode} id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-maincolor focus:ring-2 focus:ring-maincolor text-base outline-none text-gray-700 py-1 px-3  leading-8 transition-colors duration-200 ease-in-out" />

          </div>
          <button onClick={handleupdate} className="flex  text-white bg-maincolor border-0 py-2 px-4 focus:outline-none hover:bg-metal-300 mt-2 mb-5 mx-2 rounded text-base justify-center items-center "><span className='mx-1'>Submit </span> </button>
        </div>

        <h2 className='leading-7 mx-8 mt-5 p-2 text-lg'> Change Password</h2>
        <div className='flex flex-wrap mx-8'>
          <div className="px-2 mb-4 w-[100%] md:w-1/3">
            <label htmlFor="password" className="leading-7 text-sm ">Current Password</label>
            <input type="password" onChange={onchange} value={password} id="currentpassword" name="password" className="w-full bg-white  rounded border border-gray-300 focus:border-maincolor focus:ring-2 focus:ring-maincolor text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="px-2 mb-4 w-[100%] md:w-1/3">
            <label htmlFor="password" className="leading-7 text-sm ">New Password</label>
            <input type="password" onChange={onchange} value={newpassword} id="newpassword" name="newpassword" className="w-full bg-white rounded border border-gray-300 focus:border-maincolor focus:ring-2 focus:ring-maincolor text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="px-2 mb-4 w-[100%] md:w-1/3">
            <label htmlFor="password" className="leading-7 text-sm ">Confirm New Password</label>
            <input type="password" onChange={onchange} value={confirmnewpassword} id="confirmpassword" name="confirmnewpassword" className="w-full bg-white rounded border border-gray-300 focus:border-maincolor focus:ring-2 focus:ring-maincolor text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <button onClick={handleupdatepassword} className="flex   text-white bg-maincolor border-0 py-2 px-4 focus:outline-none hover:bg-metal-300 mt-2 mb-5 mx-2 rounded text-base justify-center items-center "><span className='mx-1'>Submit </span> </button>
        </div>


      </div>
    </div>

  )
}

export default Checkout