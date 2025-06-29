import Navbar from '@/components/Navbar'
import Link from 'next/link'
import React from 'react'

export default function dashboardLayout({children}) {
  return (
    <div className='grid grid-cols-12'>
      <div className='col-span-4 bg-amber-900'><h2>Dashboard Side navigation</h2> <Link href={'/users'}>Users</Link></div>

      <div className='col-span-8 bg-amber-200'>
            
      {children}
      </div>
      
      </div>
  )
}
