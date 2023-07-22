import React, { useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head';
function Forgotpassword() {
  
  useEffect(() => {
    if (localStorage.getItem('USER')){
      router.push('/');
    }
   }, [])
  return (
   
    <div className="flex min-h-screen  flex-col justify-start px-6 pt-24 lg:px-8">
       <Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
      <title>Forgot | Techwearonline</title>
      </Head>
<div className="sm:mx-auto  sm:w-full sm:max-w-sm">
  <img className="mx-auto h-32 w-auto" src="/logo1.png" alt="Your Company"/>
  <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Forgot Password</h2>
</div>

<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
  <form className="space-y-6" action="#" method="POST">
 
    <div>
      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
      <div className="mt-2">
        <input id="email" name="email" type="email" autoComplete="email" required className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-maincolor sm:text-sm sm:leading-6" placeholder='example@gmail.com'/>
      </div>
    </div>

    
    <div>
      <button type="submit" className="flex w-full justify-center rounded-md bg-maincolor px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-maincolor focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maincolor">Continue</button>
    </div>
  </form>
 
 
</div>
</div>

  )
}

export default Forgotpassword