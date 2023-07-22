import Link from 'next/link'
import React from 'react'
const mongoose = require('mongoose');
import Product from '@/model/Product';
import Head from 'next/head';

function Mugs({ mug , isdark }) {
  
if(mug == null){
  return <p className='min-h-screen text-center mt-10'>Sorry all the mugs are out of stock. New stock coming soon. Stay tuned!</p>
}
  return (
    <div>
      <Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
      <title>Mugs | Techwearonline</title>
      </Head>
      <section className={`min-h-screen  ${isdark? 'bg-darkgreyish':'bg-white'} text-gray-600 body-font`}>
        <div className="container px-5 py-24 mx-auto">
          <div className="flex justify-center flex-wrap -m-4 ">

            
            {Object.keys(mug).map((element) => {
              {console.log(mug[element].color)}
              return <Link key={mug[element]._id} href={`/product/${mug[element].slug}`}>
                <div className={`p-2 mx-auto rounded-lg ${isdark? 'bg-lightgreyish':'bg-white'} lg:mx-3 cursor-pointer shadow-lg m-2`}>
                  <div className="block relative 
               rounded overflow-hidden">
                    <img alt="ecommerce" className="m-auto h-[40vh] w-[40vh] block" src={mug[element].img} />
                  </div>
                  <div className="mt-4 mx-2">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{mug[element].category}</h3>
                    <h2 className={`${isdark?'text-white':'text-gray-900'}  title-font text-lg font-medium`}>{mug[element].title}</h2>
                    <p className={`${isdark?'text-white':'text-gray-900'} mt-1`} >₹{mug[element].price}</p>
                    <p className="my-2 space-x-2">
                      {mug[element].color.includes('Red') &&  <button className="border-2 border-gray-300  bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button> }
                      {mug[element].color.includes('Blue') &&  <button className="border-2 border-gray-300  bg-blue-600 rounded-full w-6 h-6 focus:outline-none"></button> }
                      {mug[element].color.includes('Green') &&  <button className="border-2 border-gray-300  bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button> }
                      {mug[element].color.includes('Yellow') &&  <button className="border-2 border-gray-300  bg-yellow-400 rounded-full w-6 h-6 focus:outline-none"></button> }
                      {mug[element].color.includes('Black') &&  <button className="border-2 border-gray-300  bg-black rounded-full w-6 h-6 focus:outline-none"></button> }
                    
  
                     </p>
                    <p className="my-3 space-x-2">
                      {mug[element].size.includes('S') && <span className={`border ${isdark?'text-white':'text-black'} ${isdark?'border-white':'border-gray-600'}   p-1`}>S</span> }
                      {mug[element].size.includes('M') && <span className={`border ${isdark?'text-white':'text-black'} ${isdark?'border-white':'border-gray-600'}   p-1`}>M</span> }
                      {mug[element].size.includes('L') && <span className={`border ${isdark?'text-white':'text-black'} ${isdark?'border-white':'border-gray-600'}   p-1`}>L</span> }
                      {mug[element].size.includes('XL') && <span className={`border ${isdark?'text-white':'text-black'} ${isdark?'border-white':'border-gray-600'}   p-1`}>XL</span> }
                      {mug[element].size.includes('XXL') && <span className={`border ${isdark?'text-white':'text-black'} ${isdark?'border-white':'border-gray-600'}   p-1`}>XXL</span> }
  
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
  const getproduct = await Product.find({category:'mugs'});
  const mug={};
    
    for(let items of getproduct){
      if(items.title in mug){
        if( !mug[items.title].color.includes(items.color) && items.availableQty >=0){
          mug[items.title].color.push(items.color);
        }
        if( !mug[items.title].size.includes(items.size) && items.availableQty >=0){
          mug[items.title].size.push(items.size);
        }
      }
      else{
        mug[items.title] = JSON.parse(JSON.stringify(items));
        if(items.availableQty >=0){
          mug[items.title].color=[items.color];
          mug[items.title].size=[items.size];
        }
      }
    }

  return { props: { mug:JSON.parse(JSON.stringify(mug)) } }
}

export default Mugs