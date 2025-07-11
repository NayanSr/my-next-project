// 'use client'

import Link from 'next/link';

import React from 'react'
import PurchasePage from './PurchasePage';
import Image from 'next/image';

function ProductCart({ product }) {
  // console.log(product);
  const { _id, name, description, price, image } = product;
  const productToPurchaseCart= {_id, name, price, image:image[0]}
  const productStringify = JSON.stringify(productToPurchaseCart)



  return (
    <div className="mt-4 card bg-amber-700 w-96 shadow-sm border-2 border-amber-600">
      <figure>
        <img
          className='w-[80%] border-2 border-amber-600 p-4 rounded-2xl mt-2'
          src={image[0]}
          alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>

        <p>{description.slice(0, 150)} ... </p>
        <h6 className='text-lg'>${price}</h6>
        <div className="card-actions justify-around mt-2 w-full">

          <Link href={`/products/${_id}`} className="btn btn-success text-xl " >Details</Link>
          <PurchasePage product={productStringify} />
        </div>
      </div>
    </div>
  )
}

export default ProductCart