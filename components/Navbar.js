import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/Ai';


function Navbar() {
  return (
    <div >
      <header className="text-gray-600 body-font shadow-md mb-1">
    <div className="container  flex flex-wrap p-5 flex-col md:flex-row items-center  ">
      <a href='/' className="flex mr-10 cursor-pointer title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
       <Image src="/logo.png" alt="" height={60}width={300}/>
      
      </a>
      <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-xl justify-center cursor-pointer font-bold">
       <Link href={'/tshirt'}className="mr-5 hover:text-gray-900"> Tshirts</Link>
       <Link href={'/hoodies'}className="mr-5 hover:text-gray-900"> Hoodies</Link>
       <Link href={'/mugs'}className="mr-5 hover:text-gray-900"> Mugs</Link>
       <Link href={'/caps'}className="mr-5 hover:text-gray-900"> Caps</Link>
       <Link href={'/sweatshirts'}className="mr-5 hover:text-gray-900"> Sweatshirts</Link>
       <Link href={'/mousepad'}className="mr-5 hover:text-gray-900"> Mousepad</Link>
      </nav>
      <div className='text-3xl cursor-pointer absolute right-5 top-8 '>< AiOutlineShoppingCart/></div>
    </div> 
  </header></div>
  )
}

export default Navbar