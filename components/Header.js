import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
function Header() {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className=" pt-12 ">
          <div className=" w-full items-center text-center">
            <h1 style={{ fontFamily: 'Bitter' }} className=" font-bold text-3xl  title-font   text-gray-900">COLLECTIONS</h1>

          </div>
          <div className="">

            <div className="flex justify-center flex-wrap rounded-md   mt-4">
              <div className='m-4'>
                <div className="rounded-lg shadow-md transition hover:scale-105 hover:duration-300">
                  <Link href="/tshirt" className="">
                    <Image
                      className="h-[24rem]"
                      src="/IMG1.avif"
                      alt="wrappixel kit"
                      width={450}
                      height={1000}
                    />
                  </Link>
                  <div>
                    <h1 className="font-bold text-lg text-black bottom-8 m-b-0  text-center">
                      TSHIRTS
                    </h1>

                  </div>
                </div>
              </div>
              <div className='m-4'>
                <div className="rounded-lg shadow-md transition hover:scale-105 hover:duration-300">
                  <Link href="/hoodies" className="">
                    <Image
                      className="h-[24rem]"
                      src="/IMG2.avif"
                      alt="wrappixel kit"
                      width={450}
                      height={1000}
                    />
                  </Link>
                  <div>
                    <h1 className="font-bold text-lg text-black bottom-8 m-b-0  text-center">
                      HOODIES
                    </h1>

                  </div>
                </div>
              </div>
              <div className='m-4'>
                <div className="rounded-lg shadow-md transition hover:scale-105 hover:duration-300">
                  <Link href="/mugs" className="">
                    <Image
                      className="h-[24rem]"
                      src="/IMG3.avif"
                      alt="wrappixel kit"
                      width={450}
                      height={1000}
                    />
                  </Link>
                  <div>
                    <h1 className="font-bold text-lg text-black bottom-8 m-b-0  text-center">
                      MUGS
                    </h1>

                  </div>
                </div>
              </div>
              <div className='m-4'>
                <div className="rounded-lg shadow-md transition hover:scale-105 hover:duration-300">
                  <Link href="/caps" className="">
                    <Image
                      className="h-[24rem]"
                      src="/IMG4.avif"
                      alt="wrappixel kit"
                      width={450}
                      height={1000}
                    />
                  </Link>
                  <div>
                    <h1 className="font-bold text-lg text-black bottom-8 m-b-0  text-center">
                      CAPS
                    </h1>

                  </div>
                </div>
              </div>
              <div className='m-4'>
                <div className="rounded-lg shadow-md transition hover:scale-105 hover:duration-300">
                  <Link href="/sweatshirts" className="">
                    <Image
                      className="h-[24rem]"
                      src="/IMG55.avif"
                      alt="wrappixel kit"
                      width={450}
                      height={1000}
                    />
                  </Link>
                  <div>
                    <h1 className="font-bold text-lg text-black bottom-8 m-b-0  text-center">
                      SWEATSHIRTS
                    </h1>

                  </div>
                </div>
              </div>
              <div className='m-4'>
                <div className="rounded-lg shadow-md transition hover:scale-105 hover:duration-300">
                  <Link href="/mousepad" className="">
                    <Image
                      className="h-[24rem]"
                      src="/IMG6.avif"
                      alt="wrappixel kit"
                      width={450}
                      height={1000}
                    />
                  </Link>
                  <div>
                    <h1 className="font-bold text-lg text-black bottom-8 m-b-0  text-center">
                      MOUSEPAD
                    </h1>

                  </div>
                </div>
              </div>
            </div>



          </div>
        </div>

        <section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto">
    
    <div class="flex flex-wrap -m-4">
      <div class="xl:w-1/3 md:w-1/2 p-4">
        <div class="border transition hover:scale-105 hover:duration-300 shadow-lg border-gray-200 p-6 rounded-lg">
          
          <h2 class="text-lg text-center  text-gray-900 font-medium title-font mb-2">Premium Tshirts</h2>
          <p class="leading-relaxed text-center text-base">Our T-Shirts are 100% made of cotton.</p>
        </div>
      </div>
      <div class="xl:w-1/3 md:w-1/2 p-4">
        <div class="border transition hover:scale-105 hover:duration-300 shadow-lg border-gray-200 p-6 rounded-lg">
          
          <h2 class="text-lg text-center  text-gray-900 font-medium title-font mb-2">Free Shipping</h2>
          <p class="leading-relaxed text-center text-base">We ship all over India for FREE.</p>
        </div>
      </div>
      <div class="xl:w-1/3 md:w-1/2 p-4 ">
        <div class="border transition hover:scale-105 hover:duration-300 border-gray-200 shadow-lg p-6 rounded-lg">
          
          <h2 class="text-lg text-center  text-gray-900 font-medium title-font mb-2">Exciting Offers</h2>
          <p class="leading-relaxed text-center text-base">We provide amazing offers & discounts.</p>
        </div>
      </div>
   
     
 
    </div>
   
  </div>
</section>
      </section>
    </div>
  )
}

export default Header