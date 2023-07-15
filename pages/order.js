import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import Order from '@/model/Order';
import mongoose from 'mongoose';

function MyOrder({ order }) {

  console.log('ye order h' + order)
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">TECHWEARONLINE</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order Id: #{order.orderid}</h1>
              <p className="leading-relaxed mb-4">Your Order has been successfully placed!        </p>
              <div className="flex mb-4 border-b-2 ">
                <a className="flex-grow text-maincolor  border-maincolor py-2 text-lg px-1">Item Description</a>
                <a className="flex-grow text-center border-gray-300 py-2 text-lg px-1">Quantity</a>
                <a className="flex-grow text-end border-gray-300 py-2 text-lg px-1">Price</a>
              </div>

              {Object.keys(order.products).map((element) => {
                const totalPrice = order.products[element].price * order.products[element].qty;
                return <div key={element} className="flex border-t border-gray-200 py-2">
                  <span className="text-gray-500 w-36"><span className='font-semibold'>{order.products[element].name}</span> ({order.products[element].variant} / {order.products[element].size})</span>
                  <span className="ml-auto text-gray-900">{order.products[element].qty} </span>
                  <span className="ml-auto text-gray-900">₹{totalPrice}</span>
                </div>
              })}

              <div className="flex flex-col">
                <span className="title-font font-medium text-2xl text-gray-900">₹{order.amount} </span>
                <button className="flex mx-0 text-white my-3 w-32 bg-maincolor border-0 p-2 pl-4  focus:outline-none hover:bg-maincolor rounded">Track Order</button>

              </div>
            </div>
            <img alt="ecommerce" className="lg:w-1/2 w-full md:h-96 lg:h-auto h-72 object-cover object-center rounded" src="/orders1.jpg" />
          </div>
        </div>
      </section>
    </div>
  )
}
// This gets called on every request
export async function getServerSideProps(context) {

  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  console.log(context.query.id)
  const order = await Order.findOne({ orderid: context.query.id });



  return { props: { order: JSON.parse(JSON.stringify(order)) } }
}
export default MyOrder