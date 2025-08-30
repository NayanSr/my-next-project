'use client'

import { useEffect, useState } from "react"

const page = () => {
	const [orders, setOrders]= useState([]);
	useEffect(()=>{
		fetch('http://localhost:3000/api/placeOrder')
		.then(res=>res.json())
		.then(data=>setOrders(data))
	},[])
	console.log(orders)
 return (
  <div className="overflow-x-auto p-4">
    <table className="min-w-full divide-y divide-gray-500 bg-white rounded-lg shadow-md">
      <thead className="bg-cyan-800">
        <tr >
          <th className="px-4 py-2 text-left text-md text-gray-200">S/N</th>
          <th className="px-4 py-2 text-left text-md text-gray-200">Name</th>
          <th className="px-4 py-2 text-left text-md text-gray-200">Price</th>
          <th className="px-4 py-2 text-left text-md text-gray-200">Quantity</th>
          <th className="px-4 py-2 text-left text-md text-gray-200">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {orders.map((pd, index) => (
          <tr key={pd._id} className="hover:bg-gray-100 bg-cyan-600">
            <td className="px-4 py-2 text-sm text-gray-900">{index + 1}</td>
            <td className="px-4 py-2 text-sm text-gray-900">{pd.name}</td>
            <td className="px-4 py-2 text-sm text-gray-900">{pd.price}</td>
            <td className="px-4 py-2 text-sm text-gray-900">{pd.quantity}</td>
            <td className="px-4 py-2 text-sm text-gray-900">{pd.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}

export default page