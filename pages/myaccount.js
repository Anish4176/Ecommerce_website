import React, { useEffect } from 'react'
import { useRouter } from 'next/router';

function MyAccount() {
    const router= useRouter();
    useEffect(() => {
        if (!localStorage.getItem('USER')){
          router.push('/');
        }
       }, [])
  return (
    <div className='min-h-screen'>MyAccount</div>
  )
}

export default MyAccount