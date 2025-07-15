'use client'

import { postToCart } from '@/app/actions/post/postToCart';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

const page = () => {
    const searchParams = useSearchParams();
    const productParam = searchParams.get('product');
    const product = JSON.parse(productParam);
    const { data: session, status } = useSession();
    // console.log('Current user :', session?.user?.email)
    // TODO: load current user order for this product. GET it and set qty initially using useEffect()
    // console.log('from purchase :', product._id);

    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
        setQuantity(prev => prev + 1);
    };

    const handleDecrement = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    };





const handleAddToCart = async () => {
  try {
    const response = await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product, email: session?.user?.email, quantity }),
    });
    if (!response.ok) throw new Error('Failed to add to cart');
    const result = await response.json();
    console.log('Added to cart:', result);
  } catch (error) {
    console.error(error);
  }
};

    return (
        <div className=' max-w-4xl mx-auto grid grid-cols-12 my-8 rounded-3xl'>
            <section className='col-span-8 bg-amber-500 text-black p-8 rounded-l-3xl'>
                <Image src={product?.image} width={350} height={350} alt='image' />
                <h2 className='text-4xl '>{product.name}</h2>
                <h4 className='text-2xl'>${product.price}</h4>
            </section>
            <section className='col-span-4 bg-amber-800 text-white rounded-r-3xl p-4  w-full'>
                {/* Quantity control */}
                <div className="flex justify-between mb-4 bg-white">
                    <button
                        onClick={handleDecrement}
                        className="btn font-semibold btn-accent mr-2 text-2xl text-black"
                    >
                        -
                    </button>
                    <input
                        type="number"
                        min={1}
                        value={quantity}
                        onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            setQuantity(isNaN(val) || val < 1 ? 1 : val);
                        }}
                        className="input input-bordered w-30 text-center bg-white text-black text-2xl"
                    />
                    <button
                        onClick={handleIncrement}
                        className="btn font-semibold btn-accent mr-2 text-2xl text-black"
                    >
                        +
                    </button>
                </div>

                {/* Checkout Button */}
                <button onClick={handleAddToCart} className='btn btn-primary'>Add to Cart</button>
            </section>
        </div>
    );
};

export default page;



























/* 

"name":"MacBook Pro 16",
"price":{"$numberDouble":"2799.99"},
"offerPrice":{"$numberDouble":"2499.99"},
"image":["https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/rzri7kytphxalrm9rubd.webp"],
"orders":[]


*/
