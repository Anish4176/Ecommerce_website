import Image from 'next/image'
import Link from 'next/link';
import React, { useRef, useState } from 'react'
import { AiOutlineShoppingCart, AiOutlineCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/Ai';
import { BsBagCheckFill } from 'react-icons/Bs';
import { RiAccountCircleFill } from 'react-icons/Ri';
function Navbar({logout, user, cart, addToCart, removeFromCart, clearCart, subtotal }) {
  const [dropdown, setdropdown] = useState(false);

  const ref = useRef();
  const handlesidecart = () => {
    if (ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-full');
      ref.current.classList.add('translate-x-0');
      console.log(ref.current.classList);
    }
    else {
      ref.current.classList.remove('translate-x-0');
      ref.current.classList.add('translate-x-full');
      console.log(ref.current.classList);
    }
  }
  return (
    <div className="relative z-10" style={{ position: 'sticky', top: '0' }} >
      <header className="text-gray-600 body-font shadow-md mb-1 w-[100%]  sticky bg-white top-0">
        <div className="  flex flex-wrap p-5 flex-col md:flex-row md:items-center   relative ">
          <a href='/' className="flex mr-10 cursor-pointer title-font font-medium md:items-center text-gray-900 mb-4 md:mb-0">
            <Image src="/logo.png" alt="" height={60} width={300} style={{ width: "auto", height: "auto" }} />

          </a>
          <nav className="md:ml-auto md:mr-auto flex  flex-wrap text-black items-center text-xl justify-center cursor-pointer font-serif font-bold">
            <Link href={'/tshirt'} className="mr-5 hover:text-gray-900"> Tshirts</Link>
            <Link href={'/hoodies'} className="mr-5 hover:text-gray-900"> Hoodies</Link>
            <Link href={'/mugs'} className="mr-5 hover:text-gray-900"> Mugs</Link>
            <Link href={'/caps'} className="mr-5 hover:text-gray-900"> Caps</Link>
            <Link href={'/sweatshirts'} className="mr-5 hover:text-gray-900"> Sweatshirts</Link>
            <Link href={'/mousepad'} className="mr-5 hover:text-gray-900"> Mousepad</Link>
          </nav>
          <div className='absolute right-5 top-7 flex  md:space-x-2 '>

            <div onMouseOver={()=>{setdropdown(true)}} onMouseLeave={()=>{setdropdown(false)}}>

              {user.value && <RiAccountCircleFill className='text-4xl cursor-pointer text-maincolor mx-1 md:mx-4 ' />}
              {dropdown && <div className='absolute right-16  top-8 bg-metal text-maincolor font-bold p-3 rounded-md px-5'>
                <ul>
                  <Link href={'/myaccount'}><li className='my-3 cursor-pointer'>My Account</li></Link>
                  <Link href={'/orders'}><li className='my-3 cursor-pointer'>Orders</li></Link>
                   <a href={'/'}><li onClick={logout} className='my-3 cursor-pointer' >Logout</li></a>  
                </ul>
              </div>}
            </div>

            {!user.value && <Link href={'/login'}><button className='border border-black text-sm py-1 px-2 mx-1 ml-4 bg-maincolor text-white rounded-md'>Login</button> </Link>}
            <div onClick={handlesidecart} className='text-4xl cursor-pointer text-maincolor  '>< AiOutlineShoppingCart /></div>
          </div>


          <div ref={ref} className={`text-black  sidecart fixed z-20  top-0 right-0 p-5 w-full md:w-[50vh] h-[100vh] transform transition-transform translate-x-full duration-100 bg-metal`}>
            <h1 className='font-bold text-2xl pb-5'>Shopping Cart</h1>
            <div onClick={handlesidecart} className='absolute right-3 top-5 text-3xl cursor-pointer'><AiOutlineCloseCircle /></div>

            {Object.keys(cart).length == 0 &&
              <div className='my-4'>Your cart is Empty!</div>
            }
            <ol className='flex-col justify-center items-center'>
              {Object.keys(cart).map((k) => {
                return <li key={k}>
                  <div className='flex space-x-5 my-3'>
                    <div className='w-2/3 text-base font-bold'>{cart[k].name} ({cart[k].variant} / {cart[k].size}) </div>
                    <div className='w-1/3 flex justify-center items-center text-maincolor text-xl cursor-pointer'><AiFillMinusCircle onClick={() => { removeFromCart(k, 1, 499, cart[k].name, cart[k].variant, cart[k].size) }} /> <span className='mx-2'>{cart[k].qty}</span > <AiFillPlusCircle onClick={() => { addToCart(k, 1, 499, cart[k].name, cart[k].variant, cart[k].size) }} /></div>
                  </div>

                </li>
              })}
            </ol>
            <p className='font-bold mt-5'>Subtotal: ₹{subtotal} </p>
            <div className='flex'>
              <Link href={'/checkout'}> <button className="flex  text-white bg-maincolor border-0 py-2 px-4 focus:outline-none hover:bg-metal-300 my-5 mx-0 rounded text-base justify-center items-center "><BsBagCheckFill /><span className='mx-1'>Checkout</span> </button> </Link>
              <button onClick={() => clearCart()} className="flex mx-3 text-white bg-maincolor border-0 py-2 px-4 focus:outline-none hover:bg-metal-300 my-5  rounded text-base justify-center items-center "><span className='mx-1'>Clear</span> </button>
            </div>
          </div>
        </div>
      </header></div>
  )
}

export default Navbar