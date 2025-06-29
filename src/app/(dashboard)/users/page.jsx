import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div className='text-black'> 
      <li><Link href='users/user-1'>User1</Link></li>
      <li><Link href='users/user-2'>User2</Link></li>
      <li><Link href='users/user-3'>User3</Link></li>
      <li><Link href='users/user-4'>User4</Link></li>
    </div>
  )
}

export default page