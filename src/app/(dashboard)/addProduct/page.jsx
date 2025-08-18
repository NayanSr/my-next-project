
'use client'

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
	const router = useRouter();
	const { data: session } = useSession();

	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);

	console.log(currentUser);
	console.log(loading)

	const email = session?.user?.email;

	// Fetch current user details
	useEffect(() => {
		setLoading(true); // Optionally set loading true before fetch
		if(!email){
			return
		}
		if (email) {
			fetch(`http://localhost:3000/api/manageUsersRoute/${email}`)
				.then(res => res.json())
				.then(data =>setCurrentUser(data))
				.then(() => setLoading(false))

		}
	}, [email]);

	// Redirect if not a 'seller'

	useEffect(() => {
		if (currentUser) {
			if (currentUser?.role !== 'seller') {
				router.push('/users')
			}
		}
		if(!currentUser && !loading){
			router.push('/users')
		}

	}, [loading, currentUser]);



	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<h2 className="text-3xl text-blue-700">Loading....</h2>
			</div>
		);
	}

	// Handle form submission
	const handlePost = async (e) => {
		e.preventDefault();
		const form = e.target;
		const name = form.name.value;
		const email = session?.user?.email;
		const description = form.description.value;
		const price = form.price.value;
		const offerPrice = form.offerPrice.value;
		const category = form.category.value;
		const date = form.date.value;
		const image = [form.image.value];

		const data = { name, email, description, price, offerPrice, category, date, image };

		try {
			const response = await fetch('http://localhost:3000/api/postProduct', {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});
			if (response.ok) {
				alert('Product posted successfully');
				form.reset();
			} else {
				alert('Failed to post product');
			}
		} catch (error) {
			console.error('Error posting product:', error);
		}
	};

	return (
		<div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
			<h3 className="text-2xl font-semibold mb-4 text-center text-gray-800">Add A Product</h3>
			<form onSubmit={handlePost} className="space-y-4">
				{/* Product Name */}
				<div>
					<label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Name:</label>
					<input
						type="text"
						id="name"
						name="name"
						placeholder="Enter product name"
						className="w-full px-3 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						required
					/>
				</div>
				{/* User Email (readonly) */}
				<div>
					<label htmlFor="userId" className="block mb-2 text-sm font-medium text-gray-700">Email:</label>
					<input
						type="email"
						id="userId"
						name="email"
						defaultValue={session?.user?.email}
						className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						required
						readOnly
					/>
				</div>
				{/* Description */}
				<div>
					<label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">Description:</label>
					<input
						type="text"
						id="description"
						name="description"
						placeholder="Product description"
						className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						required
					/>
				</div>
				{/* Price */}
				<div>
					<label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-700">Price:</label>
					<input
						type="number"
						id="price"
						name="price"
						placeholder="Price"
						className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						required
					/>
				</div>
				{/* Offer Price */}
				<div>
					<label htmlFor="offerPrice" className="block mb-2 text-sm font-medium text-gray-700">Offered Price:</label>
					<input
						type="number"
						id="offerPrice"
						name="offerPrice"
						placeholder="Offered Price"
						className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						required
					/>
				</div>
				{/* Category */}
				<div>
					<label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-700">Product Category:</label>
					<input
						type="text"
						id="category"
						name="category"
						placeholder="Product Category"
						className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						required
					/>
				</div>
				{/* Created Date */}
				<div>
					<label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-700">Created Date:</label>
					<input
						type="date"
						id="date"
						name="date"
						className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						required
					/>
				</div>
				{/* Product Image URL */}
				<div>
					<label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-700">Product Image URL:</label>
					<input
						type="text"
						id="image"
						name="image"
						placeholder="Product Photo URL"
						className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						required
					/>
				</div>
				{/* Submit Button */}
				<button
					type="submit"
					className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
				>
					Post
				</button>
			</form>
		</div>
	);
}