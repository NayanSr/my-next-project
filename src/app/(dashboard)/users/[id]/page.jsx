import React from 'react'

function page({params}) {
const {id}=params;

  return (
    <div>Single User:{id}</div>
  )
}

export default page