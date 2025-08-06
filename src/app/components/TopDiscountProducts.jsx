'use client'
import { useEffect, useState } from "react"
import ProductCart from "./ProductCart";


const TopDiscountProducts = () => {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		fetch('http://localhost:3000/api/topDiscounted')
			.then(res => res.json())
			.then(data => setProducts(data))
	}, [])
	console.log(products)
	return (
		<div>
			<h3 className="text-2xl text-orange-300">TopDiscountProducts: {products.length}</h3>
		<div className="grid gap-2 grid-cols-1  md:grid-cols-2 lg:grid-cols-3  ">
			{products.map(product=><ProductCart product={product} key={product._id}/>)}
		</div>
		</div>
	)
}

export default TopDiscountProducts