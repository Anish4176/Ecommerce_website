import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import Head from 'next/head';
function Signup({isdark}) {
  const router = new useRouter();
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  useEffect(() => {
    if (localStorage.getItem('USER')){
      router.push('/');
    }
   }, [])

  const handlesubmit = async (e) => {
    e.preventDefault();
    // POST request using fetch with async/await

    const requestOptions = {        
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, email: email, password: password })
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, requestOptions);
    const data = await response.json();
    setname('');
    setpassword('');
    setemail('');

    if (data.success) {
      toast.success('Signup Successfully', {
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
        router.push( `${process.env.NEXT_PUBLIC_HOST}/login`)
      }, 1000);
    }

    else{
      toast.error(data.message, {
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

  const onchange = (e) => {
    if (e.target.name === 'name') {
      setname(e.target.value)
    }

    if (e.target.name === 'email') {
      setemail(e.target.value)
    }
    if (e.target.name === 'password') {
      setpassword(e.target.value)
    }
  }
  return (
    <div>
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
      <Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
      <title>Signup | Techwearonline</title>
      </Head>
      <div className={` ${isdark? 'bg-darkgreyish':'bg-white'} ${isdark? 'text-white':'text-black'} flex min-h-full flex-col justify-center px-6 py-12 lg:px-8`}>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-32 w-auto" src="/logo1.png" alt="Your Company" />
          <h2 style={{fontFamily:'Bitter'}} className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight ">Sign up for an account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handlesubmit} className="space-y-3" action="#" method="POST">
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6">Enter Your Name</label>
              <div className="mt-2">
                <input id="name" value={name} onChange={onchange} name="name" type="text" autoComplete="name" required className="block outline-none px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-submaincolor sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 ">Email address</label>
              <div className="mt-2">
                <input id="email" value={email} onChange={onchange} name="email" type="email" autoComplete="email" required className="block outline-none px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-maincolor sm:text-sm sm:leading-6" placeholder='example@gmail.com' />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 ">Password</label>

              </div>
              <div className="mt-2">
                <input id="password" value={password} onChange={onchange} name="password" type="password" autoComplete="current-password" required className="block outline-none px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-maincolor sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div >
              <button type="submit" className="flex mt-5 w-full justify-center rounded-md bg-maincolor px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-maincolor focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maincolor">Sign Up</button>
             
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Already having account?
            <Link href={'/login'}> <span href="#" className="text-lg font-semibold leading-6 mx-2 text-maincolor ">Login</span></Link>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Signup