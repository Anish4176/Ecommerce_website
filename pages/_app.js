import * as React from 'react';
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import LoadingBar from 'react-top-loading-bar'
import Footer1 from '@/components/Footer1';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';



export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [cart, setcart] = useState({});
  const [subtotal, setsubtotal] = useState(0)
  const [user, setuser] = useState({ value: null })
  const [progress, setProgress] = useState(0)
  const [sidebar, setsidebar] = useState(false);
  const [isdark, setisdark] = useState(false);
  const [open, setOpen] = React.useState(false);


  const handlesidecart = () => {
    setsidebar(!sidebar);
  }

  const handledark = () => {
    setisdark(!isdark);
  }


  useEffect(() => {
    try {
      router.events.on('routeChangeStart', () => {
        setProgress(40);
        setOpen(true);
      })
      router.events.on('routeChangeComplete', () => {
        setProgress(100);
        setOpen(false);
      })
      if (localStorage.getItem('cart')) {
        setcart(JSON.parse(localStorage.getItem('cart')))
        savecart(JSON.parse(localStorage.getItem('cart')))
      }
    }
    catch (err) {
      localStorage.clear();
    }
    const token = localStorage.getItem('USER');
    if (token) {
      setuser({ value: token })
    }
  }, [router.query])

  const savecart = (newCart) => {
    localStorage.setItem('cart', JSON.stringify(newCart));
    let keys = Object.keys(newCart);
    let subt = 0;
    for (let i = 0; i < keys.length; i++) {
      subt += newCart[keys[i]].qty * newCart[keys[i]].price;
    }
    setsubtotal(subt);


  }

  const addToCart = (itemcode, qty, price, name, variant, size) => {

    let newCart = { ...cart };
    if (itemcode in cart) {
      newCart[itemcode].qty = cart[itemcode].qty + qty;
    }
    else {
      newCart[itemcode] = { qty: 1, price, name, variant, size };
    }
    setcart(newCart);
    savecart(newCart);
    setsidebar(true);
  }
  const addToCartincheckout = (itemcode, qty, price, name, variant, size) => {
    // setsidebar(false);
    let newCart = { ...cart };
    if (itemcode in cart) {
      newCart[itemcode].qty = cart[itemcode].qty + qty;
    }
    else {
      newCart[itemcode] = { qty: 1, price, name, variant, size };
    }
    setcart(newCart);
    savecart(newCart);

  }
  const removeFromCart = (itemcode, qty, price, name, variant, size) => {
    let newCart = { ...cart };
    if (itemcode in cart) {
      newCart[itemcode].qty = cart[itemcode].qty - qty;
    }
    if (newCart[itemcode].qty <= 0) {
      delete newCart[itemcode];
    }
    setcart(newCart);
    savecart(newCart);

  }
  const clearCart = () => {

    setcart({});
    savecart({});
  }

  const buyCart = (itemcode, qty, price, name, variant, size) => {
    let newCart = {}
    newCart[itemcode] = { qty: 1, price, name, variant, size }
    setcart(newCart);
    savecart(newCart);


    router.push('/checkout');
  }

  const logout = () => {
    localStorage.removeItem('USER');
    setuser({ value: null });


  }

  return <>

    <LoadingBar
      color='#7B3DB2'
      height={3}
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
    />
    <Navbar handledark={handledark} isdark={isdark} sidebar={sidebar} setsidebar={setsidebar} onClick={handlesidecart} logout={logout} user={user} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} />
    <Backdrop
      sx={{ backgroundColor: '#FFFFFF', marginTop: '5rem', color: '#783AB1', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}

    >
      <CircularProgress color="inherit" />
    </Backdrop>
    <Component isdark={isdark} sidebar={sidebar} onClick={handlesidecart} cart={cart} addToCartincheckout={addToCartincheckout} addToCart={addToCart} buyCart={buyCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} {...pageProps} />
    <Footer handledark={handledark} isdark={isdark} />
    <Footer1 handledark={handledark} isdark={isdark} sidebar={sidebar} setsidebar={setsidebar} onClick={handlesidecart} logout={logout} user={user} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} />

  </>
}
