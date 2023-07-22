import { Carousel } from "@material-tailwind/react";

export default function Example() {
  return (
    <Carousel style={{backgroundColor:'blue'}} transition={{ duration: 0.6  }} className=" scroll-auto">

  
   
        <img
          src="/carousel1.webp"
          alt="image 1"
          className="h-[75vh] w-full object-cover scroll-auto"
          style={{ width: "100%" }}
        />
        
   
        <img
          src="/carousel2.jpg"
          alt="image 1"
          className="h-[75vh] w-full  object-top object-cover scroll-auto"
          style={{ width: "100%" }}
        />
        <img
          src="/carousel3.jpg"
          alt="image 1"
          className="h-[75vh] w-full object-top object-cover scroll-auto"
          style={{ width: "100%" }}
        />
    </Carousel>
    
  );
}


