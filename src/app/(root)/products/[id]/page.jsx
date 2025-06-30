import dbConnect from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';
import React from 'react'

const ProductDetailPage = async ({ params }) => {
      const { id } = await params;

      const productsCollection = dbConnect('products');
      const data = await productsCollection.findOne({ _id: new ObjectId(id) });
      const { category, image, offerPrice, price, description, name } = data;
      console.log(data);
      return (
            <div className='max-w-7xl mx-auto' >
                  <div className="max-w-2xl mx-auto p-6 font-sans bg-white my-8 rounded-2xl">
                        <h1 className="text-3xl font-bold mb-2 text-gray-900">{name}</h1>
                        <p className="text-md italic text-gray-800 mb-4">{category}</p>

                        <img
                              src={image}
                              alt={name}
                              className="w-[75%] h-auto rounded-lg mb-6 mx-auto"
                        />

                        <div className="mb-6">
                              <p className="text-xl font-semibold text-red-600 mb-2">
                                    ${offerPrice}
                              </p>
                              <p className="line-through text-gray-700">
                                    ${price}
                              </p>
                        </div>

                        <div>
                              <h3 className="text-xl font-semibold mb-2 text-gray-800">Description</h3>
                              <p className="text-gray-800">{description}</p>
                        </div>
                  </div>
            </div>
      )
}

export default ProductDetailPage