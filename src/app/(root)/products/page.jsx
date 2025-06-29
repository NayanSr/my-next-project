
import ProductCart from '@/app/components/ProductCart';
import { useAppContext } from '@/app/context/AppContext';
import dbConnect from '@/lib/dbConnect';
import React from 'react'

const AllProductsPage =async () => {
// const {products} = useAppContext();
const productsCollection= dbConnect("products");
const products= await productsCollection.find({}).toArray();

// console.log(products)
      return (
            <div className='max-w-7xl mx-auto '>
                 <h2 className='text-2xl'> AllProductsPage</h2>
            <div className='grid grid-cols-3 gap-4'>
                  {products?.map((product,index) => <ProductCart key={index} product={product}/>)}
            </div>
            </div>
            
      )
}

export default AllProductsPage;