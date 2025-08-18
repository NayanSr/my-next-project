'use client'
//? Load all products added to cart by current user

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function CartPage() {
	const [cartItems, setCartItems] = useState([]);  //? cartItem is data in productCart collection
		console.log(cartItems);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { data: session, status } = useSession();
	const router = useRouter();
	const email = session?.user?.email;
	const userOrders = [];
	console.log(session)

	const [showModal, setShowModal] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [newQuantity, setNewQuantity] = useState(1);
	

	useEffect(() => {
		fetch("http://localhost:3000/api/cartProduct")
			.then((res) => res.json())
			.then((data) => {
				if (data.error) {
					setError(data.error);
				} else {
					setCartItems(data);
				}
			})
			.catch((err) => setError("Failed to load"))
			.finally(() => setLoading(false));
	}, []);





	if (cartItems) {
		cartItems.forEach(item => {
			item.orders.forEach(order => {
				if (order.email === email) {
					userOrders.push({
						productId: item.productId,
						name: item.name,
						image: item.image,
						price: item.price,
						quantity: order.quantity,
						total: (order.quantity * item.price).toFixed(2)
					})
				}
			})
		})
	}
	console.log('only my : ', userOrders);

	let totalOrderedPrice = 0
	let totalOrderedQuantity = 0
	if (userOrders) {
		userOrders.forEach(pd => {
			totalOrderedPrice = totalOrderedPrice + pd?.price * pd?.quantity
			totalOrderedQuantity = totalOrderedQuantity + pd?.quantity
		})
	}
	console.log('total:', totalOrderedQuantity, totalOrderedPrice)


	const handleUpdate = async (item) => {
		setSelectedItem(item);
		setNewQuantity(item.quantity);
		setShowModal(true);
	};
	const handleSave = async () => {
		//TODO: work with it
		try {
			const res = await fetch('http://localhost:3000/api/updateQty', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ 'productId': selectedItem?.productId, email, newQuantity }),
			});
			if (!res.ok) throw new Error('Failed to add to Update');
			const updateSuccessRes = await res.json();
			console.log('Added to cart:', updateSuccessRes);
		} catch (error) {
			console.error(error);
		}
	}

	const handleDelete = async (item) => {
		console.log(selectedItem);
		try {
			const res = await fetch('http://localhost:3000/api/deleteCartOne', {
				method: "DELETE",
				body: JSON.stringify({ 'id': item.productId, email })
			})
			if (!res.ok) { throw new Error('Failed to Delete Current item') }
			const deleteSuccessRes = await res.json();
			console.log('deleteSuccessRes', deleteSuccessRes)
		} catch (error) {
			console.log(error)
		}
	}


	const handleClearCart = async () => {
		const res = await fetch('http://localhost:3000/api/deleteCart', {
			method: "DELETE", body: JSON.stringify({ email }),
		})
		if (!res.ok) { throw new Error('Failed to Delete All item in cart') }
		const deleteSuccessRes = await res.json();
		console.log(deleteSuccessRes)
	}

	//! now incompleted
	const handlePlaceOrder = async () => {
  const res = await fetch('http://localhost:3000/api/placeOrder', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify(cartItems), //! send only productId, name, description arrat with email quantity
  });
  const postSuccess = await res.json();
  if (postSuccess) {
    alert('Success');
  }
  console.log(postSuccess);
  console.log(cartItems);
};



	if (loading) return <div className="text-black bg-cyan-400 text-center">Loading...</div>;
	if (!session) {
		router.push('/signup')
	}
	if (error) return <div className="text-white bg-red-700 text-center">Error: {error}</div>;

	return (
		<div className="bg-cyan-900">
			<h1>Your Cart</h1>
			{cartItems.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				<div className="overflow-x-auto p-4">
					<table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
						<thead className="bg-gray-100">
							<tr>
								<th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">#</th>
								<th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Product Name</th>
								<th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Price</th>
								<th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Quantity</th>
								<th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Total</th>
								<th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Actions</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200">
							{userOrders.map((item, index) => (
								<tr key={index} className="hover:bg-gray-50">
									<td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
									<td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
									<td className="px-4 py-3 text-sm text-gray-900">${item.price}</td>
									<td className="px-4 py-3 text-sm text-gray-900 text-center">{item.quantity}</td>
									<td className="px-4 py-3 text-sm text-gray-900">${item.total}</td>
									<td className="px-4 py-3 flex space-x-2">
										{/* Action Buttons */}
										<button
											className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
											onClick={() => handleUpdate(item)}
										>
											Update
										</button>
										<button
											className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
											onClick={() => handleDelete(item)}
										>
											Delete
										</button>
									</td>
								</tr>
							))}

						</tbody>
						<tfoot>
							<tr className="bg-gray-900 text-xl">
								<td></td>
								<td></td>
								<td className="text-amber-700 text-center">Total:</td>
								<td className="text-amber-600 text-center">{totalOrderedQuantity}</td>
								<td className="text-amber-600">$ {totalOrderedPrice.toFixed(2)}</td>
								<td></td>
							</tr>
						</tfoot>
					</table>

				</div>
			)}
			<div className="w-full flex justify-center">
				<button
					className="mr-4 my-4  px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
					onClick={handleClearCart}
				>
					Clear Cart
				</button>
				<button
					className="  my-4  px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
					onClick={handlePlaceOrder}
				>
					Place Order
				</button>
			</div>
			{/* //? modal start */}
			{showModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-gray-600 p-6 rounded-lg shadow-lg max-w-sm w-full">
						<h2 className="text-xl font-semibold mb-4">Update Quantity</h2>
						<input
							type="number"
							min="1"
							value={newQuantity}
							onChange={(e) => setNewQuantity(Number(e.target.value))}
							className="w-full border rounded px-3 py-2 mb-4 bg-gray-800"
						/>
						<div className="flex justify-end space-x-2">
							<button
								onClick={() => setShowModal(false)}
								className="px-4 py-2 bg-orange-500 rounded hover:bg-gray-400"
							>
								Cancel
							</button>
							<button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
								Save
							</button>
						</div>
					</div>
				</div>
			)}

			{/* //? modal end */}
		</div>
	);
}


