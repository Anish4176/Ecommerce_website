import Link from 'next/link'
import React from 'react'
const mongoose = require('mongoose');
import Product from '@/model/Product';
import Head from 'next/head';

function Hood({ hood, isdark }) {

  return (
    <div>
      <Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
        <title>Hoodies | Techwearonline</title>
      </Head>
      <section className={`min-h-screen overflow-hidden ${isdark ? 'text-white' : 'text-gray-900'}  ${isdark ? 'bg-darkgreyish' : 'bg-white'}  body-font`}>
        <h1 className='text-center text-4xl pt-12 font-medium  '>Explore Our Hoodies Collection</h1>
        <hr className='w-1/3 font-semibold my-1 mx-auto' />
        <p className=' text-sm text-start  container mx-auto mt-4 px-3 md:px-24 lg:px-32 '>Stay warm and stylish with the wide selection of hoodies available at Techwearonline.com. Our hoodies are perfect for every occasion, whether you're looking for a casual everyday hoodie or something to wear to the gym. We have a variety of styles to choose from, including coding hoodies, anime hoodies, and casual hoodies for everyday wear.</p>
        <div className="container px-3 py-12 mx-auto">
          <div className="flex justify-center flex-wrap -m-4 ">

            {Object.keys(hood).length == 0 && <p>Sorry all the hoodies are out of stock. New stock coming soon. Stay tuned!</p>}
            {Object.keys(hood).map((element) => {
              return <Link key={hood[element]._id} href={`/product/${hood[element].slug}`}>
                <div className={`p-2 transition hover:scale-105 hover:duration-300 mx-auto rounded-lg ${isdark ? 'bg-lightgreyish' : 'bg-white'} lg:mx-3 cursor-pointer shadow-lg m-2`}>
                  <div className="block relative 
               rounded overflow-hidden">
                    <img alt="ecommerce" className="m-auto h-[40vh] w-[40vh] block rounded" src={hood[element].img} />
                  </div>
                  <div className="mt-4 mx-2">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{hood[element].category}</h3>
                    <h2 className={`${isdark ? 'text-white' : 'text-gray-900'}  title-font text-lg font-medium`}>{hood[element].title}</h2>
                    <p className={`${isdark ? 'text-white' : 'text-gray-900'} mt-1`} >₹{hood[element].price}</p>
                    <p className="my-2 space-x-2">
                      {hood[element].color.includes('Red') && <button className="border-2 border-gray-300  bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {hood[element].color.includes('Blue') && <button className="border-2 border-gray-300  bg-blue-600 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {hood[element].color.includes('Green') && <button className="border-2 border-gray-300  bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {hood[element].color.includes('Yellow') && <button className="border-2 border-gray-300  bg-yellow-400 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {hood[element].color.includes('Black') && <button className="border-2 border-gray-300  bg-black rounded-full w-6 h-6 focus:outline-none"></button>}


                    </p>
                    <p className="my-3 space-x-2">
                      {hood[element].size.includes('S') && <span className={`border ${isdark ? 'text-white' : 'text-black'} ${isdark ? 'border-white' : 'border-gray-600'}   p-1`}>S</span>}
                      {hood[element].size.includes('M') && <span className={`border ${isdark ? 'text-white' : 'text-black'} ${isdark ? 'border-white' : 'border-gray-600'}   p-1`}>M</span>}
                      {hood[element].size.includes('L') && <span className={`border ${isdark ? 'text-white' : 'text-black'} ${isdark ? 'border-white' : 'border-gray-600'}   p-1`}>L</span>}
                      {hood[element].size.includes('XL') && <span className={`border ${isdark ? 'text-white' : 'text-black'} ${isdark ? 'border-white' : 'border-gray-600'}   p-1`}>XL</span>}
                      {hood[element].size.includes('XXL') && <span className={`border ${isdark ? 'text-white' : 'text-black'} ${isdark ? 'border-white' : 'border-gray-600'}   p-1`}>XXL</span>}

                    </p>
                  </div>
                </div>
              </Link>
            })}
          </div>
        </div>
      </section >
    </div >
  )
}

// This gets called on every request
export async function getServerSideProps() {


  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  const getproduct = await Product.find({ category: 'hoodies' });
  const hood = {};

  for (let items of getproduct) {
    if (items.title in hood) {
      if (!hood[items.title].color.includes(items.color) && items.availableQty >= 0) {
        hood[items.title].color.push(items.color);
      }
      if (!hood[items.title].size.includes(items.size) && items.availableQty >= 0) {
        hood[items.title].size.push(items.size);
      }
    }
    else {
      hood[items.title] = JSON.parse(JSON.stringify(items));
      if (items.availableQty >= 0) {
        hood[items.title].color = [items.color];
        hood[items.title].size = [items.size];
      }
    }
  }

  return { props: { hood: JSON.parse(JSON.stringify(hood)) } }
}

export default Hood