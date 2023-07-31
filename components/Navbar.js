import Image from 'next/image'
import Link from 'next/link';
import React, { useRef, useState } from 'react'
import { AiOutlineShoppingCart, AiOutlineCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/Ai';
import { BsBagCheckFill } from 'react-icons/Bs';
import { RiAccountCircleFill, RiMoonClearFill } from 'react-icons/Ri';
import { RxHamburgerMenu } from 'react-icons/Rx';
import { ImCross } from 'react-icons/Im';
import { useRouter } from 'next/router';
function Navbar({ isdark, handledark, onClick, sidebar, setsidebar, logout, user, cart, addToCart, removeFromCart, clearCart, subtotal }) {
  const [dropdown, setdropdown] = useState(false);
  const [hamburger, sethamburger] = useState(false);

  const router = useRouter();

  const handlehamburger = () => {
    sethamburger(!hamburger);
  }


  const handleCheckout = ({ }) => {
    if (Object.keys(cart).length > 0) {
      router.push('/checkout');
      setsidebar(false);
    }
  };

  const ref = useRef();

  return (
    <div className=" relative z-10 " style={{ position: 'sticky', top: '0' }} >
      <header className={`text-gray-600 body-font   w-[100%]  sticky ${isdark ? 'bg-black' : 'bg-white'}  top-0`}>
        <div className={`flex  p-5 items-center justify-between shadow-sm ${isdark ? 'shadow-darkgreyish' : 'shadow-blue-gray-200'}  relative`}>
          <Link href='/' className="flex mr-10 cursor-pointer title-font font-medium items-center text-gray-900  md:mb-0">
            <Image src="/logo.png" alt="" height={60} width={300} style={{ width: "auto", height: "auto" }} />
          </Link>
          {!hamburger && <span onClick={handlehamburger} className='lg:hidden'><RxHamburgerMenu className='text-4xl cursor-pointer text-maincolor mx-1 md:mx-4 ' /></span>}
          {hamburger && <span onClick={handlehamburger} className='lg:hidden'><ImCross className='text-3xl cursor-pointer text-maincolor mx-1 md:mx-4 ' /></span>}
          <nav style={{ fontFamily: 'Bitter' }} className={`md:ml-auto hidden md:mr-auto lg:flex  flex-wrap  ${isdark ? 'text-white' : 'text-black'}  items-center text-xl justify-center cursor-pointer font-serif font-bold`}>
            <Link href={'/tshirt'} className="mr-5 hover:text-maincolor"> Tshirts</Link>
            <Link href={'/hoodies'} className="mr-5 hover:text-maincolor"> Hoodies</Link>
            <Link href={'/mugs'} className="mr-5 hover:text-maincolor"> Mugs</Link>
            <Link href={'/caps'} className="mr-5 hover:text-maincolor"> Caps</Link>
            <Link href={'/sweatshirts'} className="mr-5 hover:text-maincolor"> Sweatshirts</Link>
            <Link href={'/mousepad'} className="mr-28 hover:text-maincolor"> Mousepads</Link>
          </nav>
          <div className='absolute  hidden lg:flex right-5 top-7   md:space-x-2 '>
            <div onClick={onClick} className='text-4xl cursor-pointer text-maincolor  '>< AiOutlineShoppingCart />
              <span className='absolute left-6 -top-1 w-6 h-6 text-base text-white font-serif text-center  border rounded-full  bg-maincolor'>{Object.keys(cart).length} </span>
            </div>
            <div onMouseOver={() => { setdropdown(true) }} onMouseLeave={() => { setdropdown(false) }}>
              {user.value && <RiAccountCircleFill className='text-4xl cursor-pointer text-maincolor mx-1  md:mx-4 ' />}
              {dropdown && <div className='absolute right-10  top-8 bg-metal text-black  font-bold p-3 rounded-md px-5'>
                <ul>
                  <Link href={'/myaccount'}><li className='my-3 hover:text-maincolor cursor-pointer'>My Account</li></Link>
                  <Link href={'/orders'}><li className='my-3 hover:text-maincolor cursor-pointer'>My Orders</li></Link>
                  <a href={'/'}><li onClick={logout} className='my-3 hover:text-maincolor cursor-pointer' >Logout</li></a>
                </ul>
              </div>}
            </div>

            {!user.value && <Link href={'/login'}><button className='border border-black text-sm py-1 px-2 mx-2 my-1  bg-maincolor text-white rounded-md'>Login</button> </Link>}

            <div> <RiMoonClearFill onClick={handledark} className='text-4xl cursor-pointer text-maincolor  ' /></div>
          </div>


          <div style={{ fontFamily: 'Bitter' }} ref={ref} className={`text-black  sidecart fixed z-20  top-0 right-0 p-5 w-[30vh] md:w-[50vh] h-[100vh] transform transition-transform ${isdark ? 'text-white' : 'text-black'} ${isdark ? 'bg-lightgreyish' : 'bg-metal'}  ${sidebar ? 'translate-x-0' : 'translate-x-full'} `}>
            <h1 className='font-bold text-2xl pb-5'>Shopping Cart</h1>
            <div onClick={onClick} className='absolute right-3 top-5 text-3xl cursor-pointer'><AiOutlineCloseCircle /></div>

            {Object.keys(cart).length == 0 &&
              <div className='my-4'>Your cart is Empty!</div>
            }
            <ol className='flex-col justify-center items-center'>
              {Object.keys(cart).map((k) => {
                return <li key={k}>
                  <div className='flex space-x-5 my-3'>

                    <div className='w-2/3 text-base font-bold'>{cart[k].name} ({cart[k].variant} / {cart[k].size}) </div>
                    <div className={`w-1/3 flex justify-center items-center ${isdark ? 'text-white' : 'text-maincolor'}  text-xl cursor-pointer`}><AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].variant, cart[k].size) }} /> <span className='mx-2'>{cart[k].qty}</span > <AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].variant, cart[k].size) }} /></div>
                  </div>

                </li>
              })}
            </ol>
            <p className='font-bold mt-5'>Subtotal: ₹{subtotal} </p>
            <div className='flex'>
              <button onClick={handleCheckout} disabled={Object.keys(cart).length == 0} className="flex disabled:bg-submaincolor  text-white bg-maincolor border-0 py-2 px-4 focus:outline-none hover:bg-metal-300 my-5 mx-0 rounded text-base justify-center items-center "><BsBagCheckFill /><span className='mx-1'>Checkout</span> </button>
              <button disabled={Object.keys(cart).length == 0} onClick={() => clearCart()} className="flex disabled:bg-submaincolor mx-3 text-white bg-maincolor border-0 py-2 px-4 focus:outline-none hover:bg-metal-300 my-5  rounded text-base justify-center items-center "><span className='mx-1'>Clear</span> </button>
            </div>
          </div>



        </div>
        {hamburger && <div style={{ fontFamily: 'Bitter' }} ref={ref} className={`${isdark ? 'text-white' : 'text-black'}    font-body text-center fixed   left-0  w-screen font-bold ${isdark ? 'bg-lightgreyish' : 'bg-white'}   `}>


          <ol className='flex-col justify-center mt-6  text-xl items-center '>
            <Link href={'/tshirt'} className="   hover:text-maincolor"> <li className='mb-4'>Tshirts</li></Link>
            <Link href={'/hoodies'} className="  hover:text-maincolor"><li className='mb-4'> Hoodies</li></Link>
            <Link href={'/mugs'} className=" hover:text-maincolor"><li className='mb-4'> Mugs</li></Link>
            <Link href={'/caps'} className="  hover:text-maincolor"><li className='mb-4'> Caps</li></Link>
            <Link href={'/sweatshirts'} className=" mb-12 hover:text-maincolor"><li className='mb-4'> Sweatshirts</li></Link>
            <Link href={'/mousepad'} className="  hover:text-maincolor"><li className='mb-4'> Mousepads</li></Link>
          </ol>
        </div>}
      </header>
    </div>
  )
}

export default Navbar