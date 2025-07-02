"use client"
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

function Navbar() {
  const pathName = usePathname();
  const { data: session, status } = useSession();
  // console.log(session)  




  if (pathName.includes('users') || pathName.includes('admin')) {
    return <>

    </>
  }
  return (
    <div className='bg-gray-700'>
      < div className="navbar max-w-7xl mx-auto px-4 shadow-sm" >
        <div className="navbar-start">
          <div className="dropdown md:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow ">
              <li><Link href={'/'}>Home</Link></li>
              <li><Link href={'/products'}>Products</Link></li>
              <li><Link href={'/about'}>About</Link></li>
            </ul>
          </div>
          <div className='hidden md:block text-3xl'>
            <ul className="menu menu-horizontal">
              <li className='text-xl'><Link href={'/'}>Home</Link></li>
              <li className='text-xl'><Link href={'/products'}>Products</Link></li>
              <li className='text-xl'><Link href={'/about'}>About</Link></li>
            </ul>
          </div>
        </div>
        {/*  <div className="navbar-center">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div> */}
        <div className="navbar-end">
          <Link className='mr-4 text-xl' href={'/users'}>Dashboard</Link>
          {status == "authenticated" ? (<>
            <Image className='mx-2 rounded-full' src={session?.user?.image} width={40} height={40} alt='Profile Image' />
            <button className='btn text-xl' onClick={() => signOut()}>Logout</button>
          </>
          ) : (<>
            <Link className='mr-4 text-xl' href={'/signup'}>SignUp</Link>
            <Link className='mr-4 text-xl' href={'/signin'}>Signin</Link>
          </>)}

          {/* <Link href={'/*'}>{user?.name? 'Hi' : 'P'}</Link> */}
        </div>
      </div >
    </div>

  )
}

export default Navbar