"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

function Navbar() {
  const pathName = usePathname();

  console.log(pathName)
  if (pathName.includes('users') || pathName.includes('admin')) {
   return <>
   <h2>this is includes dashboard in pathname</h2>
   <Link href={'/'} className='text-6xl'>H</Link>
    </>
  }
  return (
    <div>
      <Link href={'/users'}>User dashboard</Link>
    </div>
  )
}

export default Navbar