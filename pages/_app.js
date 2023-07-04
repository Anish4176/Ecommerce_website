import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [cart, setcart] = useState({});
  const [subtotal, setsubtotal] = useState(0)
  useEffect(() => {
   try{
    if(localStorage.getItem('cart')){
      setcart(JSON.parse(localStorage.getItem('cart')))
      savecart(JSON.parse(localStorage.getItem('cart')))
    }  
   }
   catch(err){
    console.log(err);
    localStorage.clear();
   }
   
  }, [])
  
  const savecart=(newCart)=>{
    localStorage.setItem('cart', JSON.stringify(newCart));
    let keys=Object.keys(newCart);
    let subt=0;
    for(let i=0;i<keys.length;i++){
       subt+=newCart[keys[i]].qty * newCart[keys[i]].price;
    }
    setsubtotal(subt);

 
  }

  const addToCart = (itemcode,qty,price,name,variant,size)=>{

    let newCart={...cart};  
    if(itemcode in cart){
         newCart[itemcode].qty= cart[itemcode].qty + qty;
    }
    else{
        newCart[itemcode]= {qty:1,price,name,variant,size};
    }
    setcart(newCart);
    savecart(newCart);

  }
  const removeFromCart = (itemcode,qty,price,name,variant,size)=>{
    let newCart={...cart};  
    if(itemcode in cart){
         newCart[itemcode].qty= cart[itemcode].qty - qty;
    }
    if(newCart[itemcode].qty<=0){
      delete newCart[itemcode];
    }
    setcart(newCart);
    savecart(newCart);

  }
  const clearCart=()=>{

    setcart({});
    savecart({});
  }
  
  const buyCart=(itemcode,qty,price,name,variant,size)=>{
    let newCart={itemcode:{qty:1,price,name,variant,size}}
    setcart(newCart);
    savecart(newCart);
    

    router.push('/checkout');
  }


  return <>
  <Navbar cart={cart} addToCart={addToCart}  removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} />
<Component cart={cart} addToCart={addToCart} buyCart={buyCart}  removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} {...pageProps} />
<Footer/>
  </> 
}
