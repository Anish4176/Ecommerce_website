import Link from 'next/link'
import React from 'react'
const mongoose = require('mongoose');
import Product from '@/model/Product';
import Head from 'next/head';

function Mugs({ mug, isdark }) {

  if (mug == null) {
    return <p className='min-h-screen text-center mt-10'>Sorry all the mugs are out of stock. New stock coming soon. Stay tuned!</p>
  }
  return (
    <div>
      <Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
        <title>Mugs | Techwearonline</title>
      </Head>
      <section className={`min-h-screen overflow-hidden ${isdark ? 'text-white' : 'text-gray-900'}  ${isdark ? 'bg-darkgreyish' : 'bg-white'}  body-font`}>
        <h1 className='text-center text-4xl pt-12 font-medium  '>Explore Our Mugs Collection</h1>
        <hr className='w-1/3 font-semibold my-1 mx-auto' />
        <p className=' text-sm text-start  container mx-auto mt-4 px-3 md:px-24 lg:px-32 '>Stay hydrated and show off your personality with the wide selection of mugs available at Techwearonline.com. Our mugs are perfect for every interest, including coding mugs for tech enthusiasts, anime mugs, and casual mugs for everyday use. All of our mugs are made with high-quality materials and are designed to be durable and long-lasting. Shop now and find the perfect mug for you!</p>
        <div className="container px-3 py-14 mx-auto">
          <div className="flex justify-center flex-wrap -m-4 ">


            {Object.keys(mug).map((element) => {
              return <Link key={mug[element]._id} href={`/product/${mug[element].slug}`}>
                <div className={`p-2 transition hover:scale-105 hover:duration-300 mx-auto rounded-lg ${isdark ? 'bg-lightgreyish' : 'bg-white'} lg:mx-3 cursor-pointer shadow-lg m-2`}>
                  <div className="block relative 
               rounded overflow-hidden">
                    <img alt="ecommerce" className="m-auto h-[40vh] w-[40vh] block rounded" src={mug[element].img} />
                  </div>
                  <div className="mt-4 mx-2">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{mug[element].category}</h3>
                    <h2 className={`${isdark ? 'text-white' : 'text-gray-900'}  title-font text-lg font-medium`}>{mug[element].title}</h2>
                    <p className={`${isdark ? 'text-white' : 'text-gray-900'} mt-1`} >₹{mug[element].price}</p>
                    <p className="my-2 space-x-2">
                      {mug[element].color.includes('Red') && <button className="border-2 border-gray-300  bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {mug[element].color.includes('Blue') && <button className="border-2 border-gray-300  bg-blue-600 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {mug[element].color.includes('Green') && <button className="border-2 border-gray-300  bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {mug[element].color.includes('Yellow') && <button className="border-2 border-gray-300  bg-yellow-400 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {mug[element].color.includes('Black') && <button className="border-2 border-gray-300  bg-black rounded-full w-6 h-6 focus:outline-none"></button>}


                    </p>
                    <p className="my-3 space-x-2">
                      <span className={`border ${isdark ? 'text-white' : 'text-black'} ${isdark ? 'border-white' : 'border-gray-600'}   p-2`}>STANDARD</span>


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
  const getproduct = await Product.find({ category: 'mugs' });
  const mug = {};

  for (let items of getproduct) {
    if (items.title in mug) {
      if (!mug[items.title].color.includes(items.color) && items.availableQty >= 0) {
        mug[items.title].color.push(items.color);
      }
      if (!mug[items.title].size.includes(items.size) && items.availableQty >= 0) {
        mug[items.title].size.push(items.size);
      }
    }
    else {
      mug[items.title] = JSON.parse(JSON.stringify(items));
      if (items.availableQty >= 0) {
        mug[items.title].color = [items.color];
        mug[items.title].size = [items.size];
      }
    }
  }

  return { props: { mug: JSON.parse(JSON.stringify(mug)) } }
}

export default Mugs