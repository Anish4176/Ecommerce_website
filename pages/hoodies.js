import Link from 'next/link'
import React from 'react'
const mongoose = require('mongoose');
import Product from '@/model/Product';


function Hood({ hood }) {
  
console.log('htis is hood'+ hood);
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex justify-center flex-wrap -m-4 space-x-6">

            {Object.keys(hood).length==0 && <p>Sorry all the hoodies are out of stock. New stock coming soon. Stay tuned!</p>}
            {Object.keys(hood).map((element) => {
              {console.log(hood[element].color)}
              return <Link key={hood[element]._id} href={`/product/${hood[element].slug}`}>
                <div className=" p-2 mx-auto lg:mx-1 cursor-pointer shadow-md m-2">
                  <div className="block relative 
               rounded overflow-hidden">
                    <img alt="ecommerce" className="m-auto h-[40vh] w-[40vh] block" src={hood[element].img} />
                  </div>
                  <div className="mt-4 mx-2">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{hood[element].category}</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{hood[element].title}</h2>
                    <p className="mt-1">₹{hood[element].price}</p>
                    <p className="my-2 space-x-2">
                      {hood[element].color.includes('Red') &&  <button className="border-2 border-gray-300  bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button> }
                      {hood[element].color.includes('Blue') &&  <button className="border-2 border-gray-300  bg-blue-600 rounded-full w-6 h-6 focus:outline-none"></button> }
                      {hood[element].color.includes('Green') &&  <button className="border-2 border-gray-300  bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button> }
                      {hood[element].color.includes('Yellow') &&  <button className="border-2 border-gray-300  bg-yellow-400 rounded-full w-6 h-6 focus:outline-none"></button> }
                      {hood[element].color.includes('Black') &&  <button className="border-2 border-gray-300  bg-black rounded-full w-6 h-6 focus:outline-none"></button> }
                    
  
                     </p>
                    <p className="my-3 space-x-2">
                      {hood[element].size.includes('S') && <span className='border border-gray-600 p-1'>S</span> }
                      {hood[element].size.includes('M') && <span className='border border-gray-600  p-1'>M</span> }
                      {hood[element].size.includes('L') && <span className='border border-gray-600  p-1'>L</span> }
                      {hood[element].size.includes('XL') && <span className='border border-gray-600  p-1'>XL</span> }
                      {hood[element].size.includes('XXL') && <span className='border border-gray-600  p-1'>XXL</span> }
  
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
  const getproduct = await Product.find({category:'hoodies'});
  const hood={};
    
    for(let items of getproduct){
      if(items.title in hood){
        if( !hood[items.title].color.includes(items.color) && items.availableQty >0){
          hood[items.title].color.push(items.color);
        }
        if( !hood[items.title].size.includes(items.size) && items.availableQty >0){
          hood[items.title].size.push(items.size);
        }
      }
      else{
        hood[items.title] = JSON.parse(JSON.stringify(items));
        if(items.availableQty >0){
          hood[items.title].color=[items.color];
          hood[items.title].size=[items.size];
        }
      }
    }

  return { props: { hood:JSON.parse(JSON.stringify(hood)) } }
}

export default Hood