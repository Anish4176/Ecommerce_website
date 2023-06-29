import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
        
        <div>
        <img src="/background1.jpg" alt="" style={{background:"url('/background1.jpg') no-repeat ; height: 67vh; width: 100%;"}}/>

        </div>
        <Header/>
        
    </>
      
  )
}
