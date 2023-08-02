import { useRouter } from 'next/router';
import React, { useState, useCallback, useEffect } from 'react'
import mongoose from 'mongoose';
import Product from '@/model/Product';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Error from 'next/error';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Slug({ isdark, addToCart, product, variants, buyCart, error }) {
  if (error == 404) {
    return <Error statusCode={404} />
  }
  const router = useRouter();
  const { slug } = router.query;

  const [service, setservice] = useState(null)
  const [pin, setpin] = useState(null);
  const [open, setOpen] = React.useState(false);

  const handlepincheck = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    setOpen(true);
    const checkpin = await response.json();
    setOpen(true);
    for (let i in checkpin) {
      if (pin === i) {
        setservice(true);
        toast.success('Your pincode is serviceable', {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
    }
    setservice(false);
    toast.error('Sorry, pincode not serviceable', {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  const onchange = (e) => {
    setpin(e.target.value);
  }
  useEffect(() => {

    setsize(product.size);
    setcolor(product.color);
  }, [router.query])

  const [size, setsize] = useState(product.size)
  const [color, setcolor] = useState(product.color)
  const refreshvariant = (size, color) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[color][size]['slug']}`

    // window.location = url;
    router.push(url);
  }

  return (
    <div>
      <ToastContainer
        position="bottom-center"
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
        sx={{ backgroundColor: '#FFFFFF', color: '#783AB1', zIndex: (theme) => theme.zIndex.drawer + 1}}
        open={open}
        
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <section className={`${isdark ? 'bg-darkgreyish' : 'bg-white'} text-gray-600 body-font overflow-hidden`}>
        <div className="mx-auto w-[100%]  py-8 ">
          <div className=" mx-auto flex justify-center flex-wrap">
            <img alt="ecommerce" className="lg:w-[65vh]   w-[80%] md:w-[60%] lg:h-[80vh] h-[50vh]  object-top rounded" src={product.img} />
            <div className="lg:w-1/2 pl-[1.3rem] md:mx-10  lg:py-3 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">TechWearOnline</h2>
              <h1 className={`${isdark ? 'text-white' : 'text-gray-900'} font-bold text-2xl md:text-4xl  text-black mb-1`}>{product.title} ({product.size} / {product.color}) </h1>
              <h2 className="text-md title-font mt-3 font-bold text-gray-900 tracking-widest">Product Description :</h2>
              <p className={`${isdark ? 'text-white' : 'text-gray-900'} leading-relaxed`}>{product.desc} </p>
              <div className="flex flex-col mt-6 items-start pb-5 border-b-2 border-gray-100 mb-5 ">
                <div className="flex space-x-1">
                  <span className={`${isdark ? 'text-white' : 'text-gray-900'} mr-3`}>Color :</span>
                  {Object.keys(variants).includes('Red') && Object.keys(variants['Red']).includes(size) && <button className={`border-2 ${color == 'Red' ? 'border-black' : 'border-gray-300'}   bg-red-500 rounded-full w-6 h-6 focus:outline-none`} onClick={() => { refreshvariant(size, 'Red') }}></button>}
                  {Object.keys(variants).includes('Blue') && Object.keys(variants['Blue']).includes(size) && <button className={`border-2 ${color == 'Blue'-2 ? 'border-black' : 'border-gray-300'}   bg-blue-500 rounded-full w-6 h-6 focus:outline-none`} onClick={() => { refreshvariant(size, 'Blue') }}></button>}
                  {Object.keys(variants).includes('Green') && Object.keys(variants['Green']).includes(size) && <button className={`border-2 ${color == 'Green' ? 'border-black' : 'border-gray-300'}   bg-green-500 rounded-full w-6 h-6 focus:outline-none`} onClick={() => { refreshvariant(size, 'Green') }}></button>}
                  {Object.keys(variants).includes('Yellow') && Object.keys(variants['Yellow']).includes(size) && <button className={`border-2 ${color == 'Yellow' ? 'border-black' : 'border-gray-300'}   bg-yellow-500 rounded-full w-6 h-6 focus:outline-none`} onClick={() => { refreshvariant(size, 'Yellow') }}></button>}
                  {Object.keys(variants).includes('Black') && Object.keys(variants['Black']).includes(size) && <button className={`border-2 ${color == 'Black' ? 'border-black' : 'border-gray-300'}   bg-black    rounded-full w-6 h-6 focus:outline-none`} onClick={() => { refreshvariant(size, 'Black') }}></button>}
                </div>
                <div className="flex mt-5
                 items-center">
                  <span className={`${isdark ? 'text-white' : 'text-gray-900'} mr-3`}>Size :</span>
                  <div className="">
                    <div   className={`${isdark ? 'text-white' : 'text-gray-900'}  flex`}>
                      {Object.keys(variants[color]).includes('S') && <option className={`cursor-pointer rounded flex border-2 appearance-none  py-1 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base  px-2 mx-1  ${size == 'S' ? 'border-black' : 'border-gray-300'}`} onClick={() => { refreshvariant('S', color) }} value={'S'}>S</option>}
                      {Object.keys(variants[color]).includes('M') && <option className={`cursor-pointer rounded flex border-2 appearance-none  py-1 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base  px-2 mx-1 ${size == 'M' ? 'border-black' : 'border-gray-300'}`} onClick={() => { refreshvariant('M', color) }} value={'M'}>M</option>}
                      {Object.keys(variants[color]).includes('L') && <option className={`cursor-pointer rounded flex border-2 appearance-none  py-1 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base  px-2 mx-1 ${size == 'L' ? 'border-black' : 'border-gray-300'}`} onClick={() => { refreshvariant('L', color) }} value={'L'}>L</option>}
                      {Object.keys(variants[color]).includes('XL') && <option className={`cursor-pointer rounded flex border-2 appearance-none  py-1 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base  px-2 mx-1 ${size == 'XL' ? 'border-black' : 'border-gray-300'}`} onClick={() => { refreshvariant('XL', color) }} value={'XL'}>XL</option>}
                      {Object.keys(variants[color]).includes('XXL') && <option className={`cursor-pointer rounded flex border-2 appearance-none  py-1 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base  px-2 mx-1 ${size == 'XXL' ? 'border-black' : 'border-gray-300'}`} onClick={() => { refreshvariant('XXL', color) }} value={'XXL'}>XXL</option>}
                      {Object.keys(variants[color]).includes('STANDARD') && <option className={`cursor-pointer rounded flex border-2 appearance-none  py-1 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base  px-2 mx-1 ${size == 'STANDARD' ? 'border-black' : 'border-gray-300'}`} onClick={() => { refreshvariant('XXL', color) }} value={'XXL'}>STANDARD</option>}

                    </div>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                {product.availableQty > 0 && <span className={`${isdark ? 'text-white' : 'text-gray-900'} title-font font-medium text-2xl text-gray-900`}>₹{product.price}</span>}
                {product.availableQty <= 0 && <span className="title-font font-medium text-red-500 text-xl  md:text-2xl ">Out of Stock!</span>}

                <button disabled={product.availableQty <= 0} onClick={() => { buyCart(slug, 1, product.price, product.title, product.color, product.size) }} className="  flex disabled:bg-submaincolor ml-2   md:ml-8 text-white bg-maincolor border-0 py-2 px-3 md:px-6 focus:outline-none hover:bg-maincolor rounded">Buy Now</button>

                <button disabled={product.availableQty <= 0} onClick={() => { addToCart(slug, 1, product.price, product.title, product.color, product.size) }} className="flex ml-3 disabled:bg-submaincolor text-white bg-maincolor border-0 py-2 px-3 md:px-6 focus:outline-none hover:bg-maincolor rounded">Add to Cart</button>
              </div>
              <div className='flex mt-9 mb-3 justify-start items-center '>
                <input onChange={onchange} type="text" className='border border-maincolor p-2 rounded' placeholder='Enter your Pincode' />
                <button onClick={handlepincheck} className='flex ml-4 text-white bg-maincolor border-0 py-2 px-6 focus:outline-none hover:bg-maincolor rounded'>Check</button>
              </div>

              {(service && service != null) && <div className='text-green-600 font-bold'>Yay! This pincode is serviceable</div>}
              {(!service && service != null) && <div className='text-red-600 font-bold'>Sorry! We do not deliver to this pincode yet</div>}

            </div>
          </div>

        </div>
      </section >
    </div >
  )
}

// This gets called on every request
export async function getServerSideProps(context) {
  let error;

  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  const getproduct = await Product.findOne({ slug: context.query.slug });
  if (getproduct == null) {
    return { props: { error: 404 } }
  }
  const variants = await Product.find({ title: getproduct.title, category: getproduct.category })
  const ColorSizeSlug = {}  //{red:{XL:{slug:wear-the-code}}}
  for (let item of variants) {
    if (Object.keys(ColorSizeSlug).includes(item.color)) {
      ColorSizeSlug[item.color][item.size] = { slug: item.slug }
    }
    else {
      ColorSizeSlug[item.color] = {};
      ColorSizeSlug[item.color][item.size] = { slug: item.slug }
    }
  }

  return { props: { product: JSON.parse(JSON.stringify(getproduct)), variants: JSON.parse(JSON.stringify(ColorSizeSlug)) } }
}

export default Slug