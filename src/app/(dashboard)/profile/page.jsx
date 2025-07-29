/* "use client"
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function Page() {
  const [role, setRole] = useState('');
  const [user, setUser] = useState({});
  const {data: session}= useSession();
  console.log("sess:",session?.user?.email);
  console.log('user', user)

// Here I want to load current user using a API call for load current user data matched with session?.user?.email



  const handleSubmit = (e) => {
    e.preventDefault();
console.log(role)
   
  };

  return (
    <div className="bg-cyan-900 -mt-2 pt-6 flex justify-center min-h-screen">
      <div className="px-4 min-h-dvh w-full max-w-4xl">
        <h2 className="text-3xl text-white mb-4">Welcome !!</h2>
        <div className="text-white mb-2">
          <h3 className="text-2xl">Name :</h3>
   
        </div>

     
        <h5 className="text-xl text-white mb-2">Email :</h5>
        <h5 className="text-xl text-white mb-4">Current Role :</h5>

      // Role Change Form  
        <div className="max-w-md mx-auto p-6 rounded shadow">
          <h2 className="text-2xl font-semibold mb-4 text-center">Apply for Role Change</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label htmlFor="role" className="block text-sm font-medium ">
              Select Role:
            </label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">--Please choose an option--</option>
              <option value="Seller">Seller</option>
              <option value="Admin">Admin</option>
            </select>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Submit Application
            </button>
          </form>
         
        </div>
      </div>
    </div>
  );
} 
*/
'use client'
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function Page() {
  const [role, setRole] = useState('');
  const [user, setUser] = useState({});
  const { data: session } = useSession();

  // Load current user data when session is available
  useEffect(() => {
    const loadUserData = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetch(`http://localhost:3000/api/users/${session.user.email}`);
          
			 if (response.ok) {
            const data = await response.json();
            setUser(data);
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    loadUserData();
  }, [session?.user?.email]);

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log('Selected Role:', role);
		const request=await fetch(`http://localhost:3000/api/users/${session.user.email}`,
			{method:'PATCH', body: JSON.stringify({'Role': role})}
		);
		const reqSuccess= await request.json();
		console.log(reqSuccess);
		if(reqSuccess.modifiedCount){
			alert(`You successfully requested for ${role}`)
		}
  };

  return (
    <div className="bg-cyan-900 -mt-2 pt-6 flex justify-center min-h-screen">
      <div className="px-4 min-h-dvh w-full max-w-4xl">
        <h2 className="text-3xl text-white mb-4">Welcome !!</h2>
        <div className="text-white mb-2">
          <h3 className="text-2xl">Name : {user.name || 'Loading...'}</h3>
        </div>
        <h5 className="text-xl text-white mb-2">Email : {session?.user?.email || 'Loading...'}</h5>
        <h5 className="text-xl text-white mb-4">Current Role : {user.role || 'Loading...'}</h5>

        {/* Role Change Form */}
        <div className="max-w-md mx-auto p-6 rounded shadow">
          <h2 className="text-2xl font-semibold mb-4 text-center">Apply for Role Change</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label htmlFor="role" className="block text-sm font-medium ">
              Select Role:
            </label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">--Please choose an option--</option>
              <option value="seller">Seller</option>
              <option value="admin">Admin</option>
            </select>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

