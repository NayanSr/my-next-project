import Navbar from '@/components/Navbar'
import Link from 'next/link'
import React from 'react'

export default function dashboardLayout({ children }) {
  return (
    <div className=' max-w-7xl mx-auto px-4 grid grid-cols-12 min-h-screen'>
      <div className='col-span-4 bg-amber-900 pt-2'>
        <h2>Dashboard Side navigation</h2>
        <ul className="menu menu-lg  z-1 mt-3 w-full p-2 shadow text-white font-semibold ">
          <li><Link href={'/'}>Home</Link></li>
          <li><Link href={'/users'}>Users</Link></li>
          <li><Link href={'/about'}>About</Link></li>
        </ul>
      </div>

      <div className='col-span-8 bg-neutral-300 pt-2'>

        {children}
      </div>

    </div>
  )
}
