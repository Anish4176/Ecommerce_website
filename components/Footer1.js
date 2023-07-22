import React from 'react'
import Link from 'next/link';
import { useRef, useState } from 'react'
import { AiOutlineShoppingCart, AiOutlineCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/Ai';
import { BsBagCheckFill } from 'react-icons/Bs';
import { RiAccountCircleFill,RiMoonClearFill } from 'react-icons/Ri';
import { useRouter } from 'next/router';
import { AiFillHome } from 'react-icons/Ai';


function Footer1({isdark,handledark, onClick, sidebar, setsidebar, logout, user, cart, addToCart, removeFromCart, clearCart, subtotal }) {
    const [dropdown, setdropdown] = useState(false);
    const router = useRouter();
    
    const toggleclick=()=>{
        setdropdown(!dropdown);
    }
    const handleCheckout = () => {
        if (Object.keys(cart).length > 0) {
            router.push('/checkout');
            setsidebar(false);
        }
    };

    const ref = useRef();
    return (
        <div className={`relative lg:hidden z-20 h-18 ${isdark? 'bg-black':'bg-white'}`} style={{ position: 'sticky', bottom: '0rem' }} >

            <div className="  flex justify-between p-5 items-center   relative ">
                <div>
              <Link href={'/'}>  <AiFillHome className='text-3xl cursor-pointer text-maincolor mx-1 md:mx-4 '/></Link>
                </div>

                    <div> <RiMoonClearFill onClick={handledark} className='text-3xl cursor-pointer text-maincolor mx-1 md:mx-4 '/></div>
                    <div onClick={onClick} className='text-3xl cursor-pointer text-maincolor  '>< AiOutlineShoppingCart />
                    <span className='absolute ml-4 top-3 w-5 h-5 text-sm text-white font-serif text-center  border rounded-full  bg-maincolor'>{Object.keys(cart).length} </span>
                    </div>

                    <div onClick={toggleclick}>
                      <RiAccountCircleFill className='text-3xl cursor-pointer text-maincolor mx-1 md:mx-4 ' />
                        {user.value && dropdown && <div className='absolute right-2  bottom-12 bg-metal text-maincolor font-bold p-2rounded-md px-3 border rounded-md'>
                            <ul>
                                <Link href={'/myaccount'}><li className='my-3 cursor-pointer'>My Account</li></Link>
                                <Link href={'/orders'}><li className='my-3 cursor-pointer'>My Orders</li></Link>
                                <a href={'/'}><li onClick={logout} className='my-3 cursor-pointer' >Logout</li></a>
                            </ul>
                        </div>}
                        {!user.value && dropdown && <div className='absolute right-2  bottom-12 bg-metal text-maincolor font-bold p-2rounded-md px-3 border rounded-md'>
                            <ul>
                                <Link href={'/login'}><li className='my-3 cursor-pointer'>Login</li></Link>
                               
                            </ul>
                        </div>}
                        
                    </div>


                <div style={{ fontFamily: 'Bitter' }} ref={ref} className={`text-black  sidecart fixed z-20  top-0 right-0 p-5 w-full md:w-[50vh] h-[100vh] transform transition-transform ${isdark? 'text-white':'text-black'} ${isdark? 'bg-lightgreyish':'bg-metal'}  ${sidebar ? 'translate-x-0' : 'translate-x-full'} `}>
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
                                    <div className={`w-1/3 flex justify-center items-center ${isdark? 'text-white':'text-maincolor'}  text-xl cursor-pointer`}><AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].variant, cart[k].size) }} /> <span className='mx-2'>{cart[k].qty}</span > <AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].variant, cart[k].size) }} /></div>
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
        </div>


    )
}

export default Footer1