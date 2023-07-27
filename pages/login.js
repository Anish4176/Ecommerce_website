import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import Head from 'next/head';
function Login({isdark}) {
  const router = new useRouter();
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
      body: JSON.stringify({ email: email, password: password })
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, requestOptions);
    const data = await response.json();

    setpassword('');
    setemail('');

    if (data.success) {
      localStorage.setItem('USER',JSON.stringify({token:data.token,email:data.useremail}));
      toast.success('Logged in Successfully', {
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
        router.push(`${process.env.NEXT_PUBLIC_HOST}`)
      }, 1000);
    }

    else{
      toast.error(data.error, {
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
      <title>Login | Techwearonline</title>
      </Head>
      <div className={` ${isdark? 'bg-darkgreyish':'bg-white'} ${isdark? 'text-white':'text-black'} flex min-h-full flex-col justify-center px-6 py-12 lg:px-8`} >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-32 w-auto" src="/logo1.png" alt="Your Company" />
          <h2 style={{fontFamily:'Bitter'}} className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight ">Sign in to your account</h2>
        </div>
 
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handlesubmit} className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 ">Email address</label>
              <div className="mt-2">
                <input id="email" name="email" onChange={onchange} value={email} type="email" autoComplete="email" required className="block outline-none px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-maincolor sm:text-sm sm:leading-6" placeholder='example@gmail.com' />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium  leading-6 ">Password</label>
                {/* <div className="text-sm">
                  <Link href={'/forgotpassword'}>  <div className=" font-semibold text-maincolor hover:text-maincolor">Forgot password?</div></Link>
                </div> */}
              </div>
              <div className="mt-2">
                <input id="password" onChange={onchange} value={password} name="password" type="password" autoComplete="current-password" required className="block outline-none px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-maincolor sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-maincolor px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-maincolor focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maincolor">Sign in</button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Not having account?
            <Link href={'/signup'}> <span href="#" className="text-lg font-semibold leading-6 mx-2 text-maincolor ">Sign Up</span></Link>
          </p>


        </div>
      </div>
    </div>
  )
}

export default Login