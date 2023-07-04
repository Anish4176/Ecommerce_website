import React from 'react'
import Link from 'next/link'

function Signup() {
  return (
    <div>
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
<div className="sm:mx-auto sm:w-full sm:max-w-sm">
  <img className="mx-auto h-32 w-auto" src="/logo1.png" alt="Your Company"/>
  <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up for an account</h2>
</div>

<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
  <form className="space-y-3" action="#" method="POST">
    <div>
      <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Enter Your Name</label>
      <div className="mt-2">
        <input id="name" name="name" type="text" autoComplete="name" required className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-maincolor sm:text-sm sm:leading-6"/>
      </div>
    </div>
    <div>
      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
      <div className="mt-2">
        <input id="email" name="email" type="email" autoComplete="email" required className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-maincolor sm:text-sm sm:leading-6" placeholder='example@gmail.com'/>
      </div>
    </div>

    <div>
      <div className="flex items-center justify-between">
        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
        
      </div>
      <div className="mt-2">
        <input id="password" name="password" type="password" autoComplete="current-password" required className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-maincolor sm:text-sm sm:leading-6"/>
      </div>
    </div>

    <div>
      <button type="submit" className="flex w-full justify-center rounded-md bg-maincolor px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-maincolor focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maincolor">Sign Up</button>
    </div>
  </form>
  <p class="mt-10 text-center text-sm text-gray-500">
      Already having account?
     <Link href={'/login'}> <span href="#" class="text-lg font-semibold leading-6 mx-2 text-maincolor hover:text-indigo-500">Login</span></Link>
    </p>
 
</div>
</div>
  </div>
  )
}

export default Signup