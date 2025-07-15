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




 {
        // const handleAddToCart = async () => {
        //     const productInCart = await fetch(`http://localhost:3000/api/cart/${product._id} `);
        //     const cartData = await productInCart.json();  // current product in productCart  if exist
        //     const isCurrentUserInOrders = cartData?.orders?.find(person => person?.email ===     session?.user?.email);  // is current user added current product in cart
        //     console.log('pdInCart:', cartData)


        //     try {
        //         if (!productInCart?.ok) {
        //             throw new Error('Failed to fetch cart data');
        //         }
        //         if (!cartData) {
        //             // Since this product not exist in productCart collection. So we need to     add current product in addition current product with email & qty
        //             console.log('Since this product not exist in productCart collection. So  we need to add current product in addition current product with email & qty');
        //             postToCart(product)
        //             /* const {orders, ...others}= product;
        //             const data= {...others, orders:[{email:session?.user?.email, quantity}]} 
        //             const result= await cartProductsCollection.insertOne(data)
        //             return result; */
        //         } else {

        //             if (!isCurrentUserInOrders) {
        //                 // Since product exist in productCart collection but current user    donot ordered yeat. So push only current user email & ordered qty
        //                 console.log('Since product exist in productCart collection but   current user donot ordered yeat. So push only current user email & ordered qty')
        //                 const { orders, ...others } = cartData;    // separating orders  array and others
        //                 console.log('orders :', orders)
        //                 console.log('others :', others)
        //                 const addPd = { ...others, orders: orders.push({ email: session?.    user?.email, quantity }) }
        //                 console.log(addPd)
        //             } else {
        //                 //* Since current product and user ordered previously. So we need to     update only qty
        //                 console.log('Since current product and user ordered previously. So   we need to update only qty')
        //             }
        //         }
        //         //// console.log('checking:', isCurrentUserInOrders)
        //         //// console.log('Data from mongodb cart : ', cartData)
        //     } catch (error) {
        //         console.error('catch :', error);
        //     }
        // }; 
}
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
