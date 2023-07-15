import React, { useEffect, useState } from 'react'
import Order from '@/model/Order'
const mongoose = require('mongoose')
import { useRouter } from 'next/router';
import Link from 'next/link';

function Orders() {
    const router = useRouter();
    const [orders, setorders] = useState([]);
    useEffect(() => {
        const user=JSON.parse(localStorage.getItem('USER'));
        const orders = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: user.token }),
            });
            let order = await response.json();
            setorders(order);
        }
        if (!localStorage.getItem('USER')) {
            router.push('/');
        }
        else {
            orders();
        }
    }, [])
    return (
        <div className='container min-h-screen'>
            <h1 className='text-center font-semibold text-3xl mt-4 py-2'>Orders</h1>
            <div className="flex flex-col container mx-auto max-w-screen-lg">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        <th scope="col" className="px-6 font-semibold py-4">Order Id</th>
                                        <th scope="col" className="px-6 font-semibold py-4">Email</th>
                                        {/* <th scope="col" className="px-6 font-semibold py-4">Amount</th> */}
                                        <th scope="col" className="px-6 font-semibold py-4">Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((element)=>{ return <tr key={element._id}
                                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-200">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">{element.orderid} </td>
                                        <td className="whitespace-nowrap px-6 py-4">{element.email} </td>
                                        {/* <td className="whitespace-nowrap px-6 py-4">{element.amount} </td> */}
                                       <Link href={`/order?id=${element.orderid}`}> <td className="whitespace-nowrap px-6 py-4">Details</td></Link>
                                    </tr>})}
                                   
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}




export default Orders