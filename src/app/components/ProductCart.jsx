import React from 'react'

function ProductCart({product}) {
  console.log(product);
  const {_id, name, description, price, image }= product;
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
    <p>{description}</p>
    <h6 className='text-lg'>${price}</h6>
    <div className="card-actions justify-around mt-2 w-full">
      
      <button className="btn btn-success">Details</button>
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
  )
}

export default ProductCart