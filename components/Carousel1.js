import { useEffect } from "react";
import { useRouter } from 'next/router';
export default function Carousel1() {
  const router = useRouter();
  useEffect(() => {
    const init = async () => {
      const { Carousel, initTE, } = await import("tw-elements");
      initTE({ Carousel });
    };
    init();
  }, []);

  const handleclick = () => {
    router.push('/tshirt')
  }
  return (


    <div
      id="carouselExampleIndicators"
      className="relative "
      data-te-carousel-init=""
      data-te-carousel-slide=""
    >
      {/*Carousel indicators*/}

      <button onClick={handleclick} className="flex absolute  bottom-5 left-0 right-0 z-[2] mx-[auto] w-32 lg:w-44 rounded-lg  text-black font-bold bg-white border-0 lg:py-2 py-[7px] font-sans focus:outline-none hover:bg-gray-100 my-5 lg:text-2xl   text-lg justify-center items-center ">Shop Now </button>

      <div
        className="absolute  bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
        data-te-carousel-indicators=""
      >
        <button
          type="button"
          data-te-target="#carouselExampleIndicators"
          data-te-slide-to={0}
          data-te-carousel-active=""
          className="mx-[3px] box-content h-[4px] bg-white w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent  bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
          aria-current="true"
          aria-label="Slide 1"
        />
        <button
          type="button"
          data-te-target="#carouselExampleIndicators"
          data-te-slide-to={1}
          className="mx-[3px] box-content h-[4px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
          aria-label="Slide 2"
        />
        <button
          type="button"
          data-te-target="#carouselExampleIndicators"
          data-te-slide-to={2}
          className="mx-[3px] box-content h-[4px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
          aria-label="Slide 3"
        />
      </div>
      {/*Carousel items*/}
      <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
        {/*First item*/}
        <div
          className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
          data-te-carousel-item=""
          data-te-carousel-active=""
        >
          <img
            src="/carousel1.webp"
            className="md:block hidden  object-fit w-full h-[55vh] lg:h-[75vh]"
            alt="Wild Landscape"
          />
          <img
            src="/carousel5.webp"
            className="block md:hidden object-fit w-full h-[55vh] lg:h-[75vh]"
            alt="Wild Landscape"
          />
        </div>
        {/*Second item*/}
        <div
          className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
          data-te-carousel-item=""
        >
          <img
            src="/carousel3.webp"
            className="md:block hidden object-fit w-full h-[55vh] lg:h-[75vh]"
            alt="Camera"
          />
          <img
            src="/carousel6.webp"
            className="block md:hidden object-fit w-full h-[55vh] lg:h-[75vh]"
            alt="Camera"
          />
        </div>
        {/*Third item*/}
        <div
          className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
          data-te-carousel-item=""
        >
          <img
            src="/carousel-3.webp"
            className="md:block hidden object-fit w-full h-[55vh] lg:h-[75vh]"
            alt="Exotic Fruits"
          />
          <img
            src="/carousel4.webp"
            className="block md:hidden object-fit w-full h-[55vh] lg:h-[75vh]"
            alt="Exotic Fruits"
          />
        </div>
      </div>
      {/*Carousel controls - prev item*/}
      <button
        className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center m-3 justify-start border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
        type="button"
        data-te-target="#carouselExampleIndicators"
        data-te-slide="prev"
      >
        <span className="inline-block h-10 p-2 w-10 bg-white rounded-full text-black font-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 26 24"
            strokeWidth="3.5"
            stroke="currentColor"
            className="h-6 w-6"
          >inline-block h-10 p-2 w-10 bg-white rounded-full text-black font-bold
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </span>
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Previous
        </span>
      </button>
      {/*Carousel controls - next item*/}
      <button
        className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-end m-3 border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
        type="button"
        data-te-target="#carouselExampleIndicators"
        data-te-slide="next"
      >
        <span className="inline-block h-10 p-2 w-10 bg-white rounded-full text-black font-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 26 24"
            strokeWidth="3.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </span>
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Next
        </span>
      </button>
    </div>

  );
}


