import React, { useEffect, useState } from 'react'
import Order from '@/model/Order'
const mongoose = require('mongoose')
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Orders({ isdark }) {
    const router = useRouter();
    const [orders, setorders] = useState([]);
    const [open, setOpen] = React.useState(false);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('USER'));
        const orders = async () => {
            setOpen(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: user.token }),
            });
          
            let order = await response.json();
            setOpen(false);
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
        
        <div className={` ${isdark ? 'bg-darkgreyish' : 'bg-white'} ${isdark ? 'text-white' : 'text-black'}  min-h-screen mx-auto`}>
            <Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
                <title> Orders | Techwearonline</title>
            </Head>
            <Backdrop
                sx={{ backgroundColor: '#FFFFFF', marginTop: '5rem', color: '#783AB1', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}

            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <h1 style={{ fontFamily: 'Bitter' }} className='text-center font-semibold text-3xl pt-4 py-2'>Orders</h1>
            <div className="flex flex-col container mx-auto max-w-screen-lg">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        {orders.length == 0 && <p className='mx-auto'>No Order placed yet!</p>}
                        {orders.length != 0 && <div className="">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr className='flex justify-between'>
                                        <th scope="col" className="px-6 font-semibold py-4">Order Id</th>
                                        <th scope="col" className="hidden lg:flex px-6 font-semibold py-4">Email</th>
                                        {/* <th scope="col" className="px-6 font-semibold py-4">Amount</th> */}
                                        <th scope="col" className="px-6 font-semibold py-4">Details</th>
                                    </tr>

                                </thead>
                                <tbody>

                                    {orders.map((element) => {
                                        return <tr key={element._id}
                                            className={`flex  justify-between border-b transition ${isdark ? 'hover:bg-submaincolor' : 'hover:bg-gray-200'} duration-300 ease-in-out  dark:border-neutral-500 `}>
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">{element.orderid} </td>
                                            <td className="hidden lg:flex whitespace-nowrap px-6 py-4">{element.email} </td>
                                            {/* <td className="whitespace-nowrap px-6 py-4">{element.amount} </td> */}
                                            <Link href={`/order?id=${element.orderid}`}> <td className="whitespace-nowrap px-6 py-4">Details</td></Link>
                                        </tr>
                                    })}

                                </tbody>
                            </table>
                        </div>}
                    </div>
                </div>
            </div>
        </div>

    )
}




export default Orders