
'use client'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function page() {
	const [users, setUsers] = useState([])
	const [loading, setLoading] = useState(true)
	const [currentUser, setCurrentUser] = useState(null)
	const { data: session } = useSession()
	const email = session?.user?.email;
	const router = useRouter();
	console.log('E :', email, 'L : ', loading, 'CU :', currentUser)




	// Fetch all users
	useEffect(() => {
		fetch('http://localhost:3000/api/manageUsersRoute')
			.then(res => res.json())
			.then(data => { setUsers(data) })

	}, [])

	// Fetch current user details
	useEffect(() => {
		setLoading(true);
		if (!email) {
			
			return;
		}

		fetch(`http://localhost:3000/api/manageUsersRoute/${email}`)
			.then(res => res.json())
			.then(data => {
				setCurrentUser(data);

			})
			.then(() => { setLoading(false) })
			.catch(error => {
				console.error("Fetch error:", error);
				setCurrentUser(null);
			})
			.finally(() => {
				// setLoading(false);

			});
	}, [email]);




	// Redirect if not admin (after currentUser is loaded)

	useEffect(() => {
		if (!loading) {
			if (!currentUser || currentUser?.role !== 'admin') {
				console.log('Redirecting to /users');
				router.push('/users');

			}
		}

	/* 	if(!email && loading && !currentUser){
			router.push('/users');
		} */

	}, [loading, currentUser]);


	if (!currentUser && loading) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-gray-100">
				<div className="flex flex-col items-center space-y-4">
					<div className="border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
					<span className="text-gray-700 text-lg font-semibold">Loading...</span>
				</div>
			</div>
		)
	}



	// Handlers
	const onChangeRole = async (user) => {
		console.log("Role :", user)
		const changeRes = await fetch(`http://localhost:3000/api/manageUsersRoute/${user?._id}`, {
			method: "PATCH",
			body: JSON.stringify({ 'action': `${user?.wantToBe}` }),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const result = await changeRes.json()
		console.log(result)
		// Optionally, refetch users or update state
		// For simplicity, refetch all users:
		fetch('http://localhost:3000/api/manageUsersRoute')
			.then(res => res.json())
			.then(data => setUsers(data))
	}

	const handleDismiss = async (user) => {
		console.log("Dismiss:", user)
		const dismissRes = await fetch(`http://localhost:3000/api/manageUsersRoute/${user?._id}`, {
			method: "PATCH",
			body: JSON.stringify({ 'action': '' }),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const result = await dismissRes.json()
		console.log(result)
		// Refetch users to update UI
		fetch('http://localhost:3000/api/manageUsersRoute')
			.then(res => res.json())
			.then(data => setUsers(data))
	}

	const onDelete = async (user) => {
		const deleteRes = await fetch(`http://localhost:3000/api/manageUsersRoute/${user?._id}`, {
			method: "DELETE"
		})
		const res = await deleteRes.json()
		console.log(res)
		// Refetch users
		fetch('http://localhost:3000/api/manageUsersRoute')
			.then(res => res.json())
			.then(data => setUsers(data))
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
							<td className="border border-gray-300 px-4 py-2 flex justify-between">
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
							<td className="border border-gray-300 px-4 py-2">
								<button
									onClick={() => onDelete(user)}
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


