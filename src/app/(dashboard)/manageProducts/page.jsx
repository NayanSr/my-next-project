
'use client'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export default function Page() {
	const { data: session } = useSession();
	const [products, setProducts] = useState([]);
	const [currentUser, setCurrentUser] = useState({});
	const [loading, setLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [formData, setFormData] = useState({ name: '', image: '', category: '', description: '', price: '', offerPrice: '' });
	const [productId, setProductId] = useState(null);

	const email = session?.user?.email;
	const router = useRouter();

	console.log('c.User', currentUser)

	// Fetch current user details
	useEffect(() => {
		setLoading(true);
		if (email) {
			fetch(`http://localhost:3000/api/manageUsersRoute/${email}`)
				.then(res => res.json())
				.then(data => {
					setCurrentUser(data);

				})

		}
		else { setLoading(false) }
	}, [email]);

	// Fetch products ,
	useEffect(() => {
		setLoading(true)
		if (email) {
			fetch(`http://localhost:3000/api/myProducts/${email}`)
				.then(res => res.json())
				.then(data => {
					setProducts(data)
					setLoading(false)
				})
				.catch(error => console.error('Error fetching products:', error))
				.finally();
		}
	}, [email]);

	// Redirect if user role is not seller
	useEffect(() => {
		if (currentUser && !loading) {
			if (currentUser?.role !== 'seller') {
				router.push('/');
			}
		}

		if (!currentUser && loading) {
			if (currentUser?.role !== 'seller') {
				router.push('/');
			}
		}
	}, [currentUser, loading]);

	// Show loading indicator if loading or currentUser not fetched
	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<h2 className="text-3xl text-blue-700">Loading....</h2>
			</div>
		);
	}

	// Handle update button click
	const handleUpdate = (product) => {
		setFormData({
			name: product.name,
			image: [product.image[0]],
			category: product.category,
			description: product.description,
			price: product.price,
			offerPrice: product.offerPrice,
		});
		setProductId(product._id);
		setShowModal(true);
	};

	const handleFormChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};



	const handleUpdateSubmit = async () => {
		if (!productId) return;
		const response = await fetch(`http://localhost:3000/api/myProducts/${productId}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formData),
		});
		const result = await response.json();
		if (result.modifiedCount === 1) {
			alert('Product updated successfully');
			// Refresh products list or update state accordingly
			// For simplicity, refetch products
			fetch(`http://localhost:3000/api/myProducts/${email}`)
				.then(res => res.json())
				.then(data => setProducts(data));
		} else {
			alert('Error updating product');
		}
		setShowModal(false);
	};

	const handleDelete = async (productId) => {
		const confirmDelete = window.confirm('Are you sure you want to delete this product?');
		if (!confirmDelete) return;

		try {
			const response = await fetch(`http://localhost:3000/api/myProducts/${productId}`, {
				method: 'DELETE',
			});
			if (!response.ok) throw new Error('Network response was not ok');
			const successRes = await response.json();
			setProducts(prev => prev.filter(p => p._id !== productId));
			console.log(successRes);
		} catch (error) {
			console.error('Error deleting product:', error);
		}
	};

	return (
		<div className="ml-4 p-4">
			<h3 className="mb-4 text-2xl font-bold">My All Products</h3>
			<table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
				<thead>
					<tr className="text-black text-left">
						<th>Serial</th>
						<th>Name</th>
						<th>Image</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{products.length === 0 ? (
						<tr>
							<td colSpan="4" style={{ textAlign: 'center' }}>No products found</td>
						</tr>
					) : (
						products.map((product, index) => (
							<tr key={product._id} className="text-black ">
								<td>{index + 1}</td>
								<td>{product.name}</td>
								<td>
									<img
										src={product.image[0]}
										alt={product.name}
										style={{ width: '100px', height: '100px', objectFit: 'cover' }}
									/>
								</td>
								<td>
									<button
										className="btn bg-blue-600 hover:bg-blue-700 hover:text-black text-lg border-none mr-4"
										onClick={() => handleUpdate(product)}
									>
										Update
									</button>
									<button
										className="btn bg-red-600 hover:bg-red-700 hover:text-black text-lg border-none"
										onClick={() => handleDelete(product._id)}
									>
										Delete
									</button>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>

			{/* Modal for update */}
			{showModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-gray-600 p-4 rounded shadow-lg w-96 max-h-[90vh] overflow-y-auto">
						<h2 className="text-xl mb-4">Update Product</h2>
						<div className="mb-2">
							<label className="block mb-1">Name</label>
							<input
								type="text"
								name="name"
								value={formData.name}
								onChange={handleFormChange}
								className="w-full border p-2 rounded"
							/>
						</div>
						<div className="mb-2">
							<label className="block mb-1">Image URL</label>
							<input
								type="text"
								name="image"
								value={formData.image}
								onChange={handleFormChange}
								className="w-full border p-2 rounded"
							/>
						</div>
						<div className="mb-2">
							<label className="block mb-1">Category</label>
							<input
								type="text"
								name="category"
								value={formData.category}
								onChange={handleFormChange}
								className="w-full border p-2 rounded"
							/>
						</div>
						<div className="mb-2">
							<label className="block mb-1">Description</label>
							<input
								type="text"
								name="description"
								value={formData.description}
								onChange={handleFormChange}
								className="w-full border p-2 rounded"
							/>
						</div>
						<div className="mb-2">
							<label className="block mb-1">Price</label>
							<input
								type="number"
								name="price"
								value={formData.price}
								onChange={handleFormChange}
								className="w-full border p-2 rounded"
							/>
						</div>
						<div className="mb-2">
							<label className="block mb-1">Offered Price</label>
							<input
								type="number"
								name="offerPrice"
								value={formData.offerPrice}
								onChange={handleFormChange}
								className="w-full border p-2 rounded"
							/>
						</div>

						<div className="flex justify-end space-x-2 mt-4">
							<button
								onClick={handleCloseModal}
								className="bg-amber-600 px-4 py-2 rounded"
							>
								Cancel
							</button>
							<button
								onClick={handleUpdateSubmit}
								className="bg-blue-600 text-white px-4 py-2 rounded"
							>
								Update
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
