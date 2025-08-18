'use client'
// import { useAppContext } from '@/app/context/AppContext'
import Link from 'next/link'

function page() {
 
  return (
    <div className=''> 
        <ul className="menu menu-md z-1 mt-3 p-2 text-black ">
                <li><Link href={'/users/user-1'}>User-01</Link></li>
                <li><Link href={'/users/user-2'}>Users-02</Link></li>
                <li><Link href={'/users/user-3'}>User-03</Link></li>
              </ul>
    </div>
  )
}

export default page