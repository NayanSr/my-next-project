'use client'
import { useEffect, useState } from "react"

export default function page() {
	const [users, setUsers] = useState([]);
	useEffect(() => {
		fetch('http://localhost:3000/api/manageUsersRoute')
			.then(res => res.json())
			.then(data => setUsers(data))
	}, [])
	console.log(users);


	const onChangeRole = async (user) => {
		console.log("Role :", user)
		const changeRes= await fetch(`http://localhost:3000/api/manageUsersRoute/${user?._id}`,
			{method:"PATCH", body: JSON.stringify({'action':`${user?.wantToBe}`})}
		)
		const result= await changeRes.json();
		console.log(result)
	}

	
	const handleDismiss = async (user) => {
		console.log("Role :", user)
		const dismissRes = await fetch(`http://localhost:3000/api/manageUsersRoute/${user?._id}`,
			{ method: "PATCH", body: JSON.stringify({ 'action': '' }) })

		const result = await dismissRes.json();
		console.log(result)
	}

		//! NOW
	const onDelete = async (user) => {
		const deleteRes= await fetch(`http://localhost:3000/api/manageUsersRoute/${user?._id}`,
			{method:"DELETE"})
		const res= await deleteRes.json();
		console.log(res)
	}
	return (
		<div className='text-black ml-2'>
			<h3>Manage Users</h3>


			<table className="min-w-full border-collapse border border-gray-200">
				<thead>
					<tr>
						<th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Name</th>
						<th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Email</th>
						<th className="border border-gray-300 px-4 py-2 bg-gray-100">Update Role</th>
						<th className="border border-gray-300 px-4 py-2 bg-gray-100">Delete</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, index) => (
						<tr key={index} className="hover:bg-gray-50">
							<td className="border border-gray-300 px-4 py-2">{user.name}</td>
							<td className="border border-gray-300 px-4 py-2">{user.email}</td>
							<td className="border border-gray-300 px-4 py-2 flex  justify-between ">

								<button
									className={`${!user.wantToBe ? 'opacity-50 cursor-not-allowed' : ''
										} bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded`}
									onClick={() => onChangeRole(user)}
									disabled={!user.wantToBe}
								>
									{user?.wantToBe ? `Approve as ${user?.wantToBe}` : `${user.role}`}
								</button>

								<button
									className={`${!user.wantToBe ? 'opacity-50 cursor-not-allowed' : ''
										} bg-orange-500 hover:bg-orange-600 text-white font-semibold py-1 px-3 rounded`}
									onClick={() => handleDismiss(user)}
									disabled={!user.wantToBe}
								>
									Dismiss
								</button>

							</td>
							<td className="border border-gray-300 px-4 py-2 ">
								{/* Delete Button */}
								<button onClick={() => onDelete(user)}
									className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"

								>
									Delete
								</button>

							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
