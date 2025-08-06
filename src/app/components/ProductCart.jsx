// 'use client'

import Link from 'next/link';

import React from 'react'
import PurchasePage from './PurchasePage';
import Image from 'next/image';

function ProductCart({ product }) {
	// console.log(product);
	const { _id, name, description, price, image, offerPrice } = product;

	const productToPurchaseCart = { _id, name, price, image: image[0] }
	const productStringify = JSON.stringify(productToPurchaseCart)



	return (
		<div className="mt-4 card bg-amber-700  shadow-sm border-2 border-amber-600">
			<figure>
				<img
					className='w-[80%] border-2 border-amber-600 p-4 rounded-2xl mt-2'
					src={image[0]}
					alt="Shoes" />
			</figure>
			<div className="card-body">
				<h2 className="card-title">{name}</h2>

				<p>{description.slice(0, 150)} ... </p>

				<div className='flex justify-between'>
					<h6 className='text-lg line-through'>Price: ${price}</h6>
					<h6 className='text-lg'>Offered :${offerPrice}</h6>
				</div>

			<h6 className='text-lg text-red-600 bg-sky-400'>
  Save: ${ (price - offerPrice).toFixed(2) }
</h6>
				<div className="card-actions justify-around mt-2 w-full">

					<Link href={`/products/${_id}`} className="btn btn-success text-xl " >Details</Link>
					<PurchasePage product={productStringify} />
				</div>
			</div>
		</div>
	)
}

export default ProductCart