import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Head from 'next/head';
import Carousel1 from '@/components/Carousel1'
const inter = Inter({ subsets: ['latin'] })




export default function Home({ isdark }) {
  return (
    <>
      <div className={`${isdark ? 'text-white' : 'text-black'} ${isdark ? 'bg-darkgreyish' : 'bg-white'}`}>

        <Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
          <title>Home | Techwearonline</title>
        </Head>

        <Carousel1 />
        <Header />
      </div>
    </>

  )
}
