/* 'use client'
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";


export default function page() {
      const {data: session}= useSession();
      console.log(session?.user?.email)
      const [products,setProducts] = useState([]);
      useEffect(()=>{
            fetch(`http://localhost:3000/api/myProducts/${session?.user?.email}`)
            .then(res=>res.json())
            .then(data=>setProducts(data))
      },[session?.user?.email])
console.log(products)
  return (
    <div>
      <h3>My All Products</h3>

    </div>
  )
} */

'use client'
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";

export default function Page() {
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`http://localhost:3000/api/myProducts/${session.user.email}`)
        .then(res => res.json())
        .then(data => setProducts(data))
        .catch(error => console.error('Error fetching products:', error));
    }
  }, [session?.user?.email]);

  const handleDelete = (productId) => {
    // Implement delete logic here
    // e.g., send a DELETE request to your API
    fetch(`http://localhost:3000/api/myProducts/${productId}`, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(() => {
      // Remove deleted product from state
      setProducts(prev => prev.filter(p => p.id !== productId));
    })
    .catch(error => console.error('Error deleting product:', error));
  };

  return (
    <div className="ml-4">
      <h3>My All Products</h3>
      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr className="text-black ">
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
                  <img src={product.image[0]} alt={product.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                </td>
                <td>
                  {/* Update button (implement your update logic) */}
                  <button style={{ marginRight: '10px' }} onClick={() => alert(`Update ${product.id}`)}>Update</button>
                  {/* Delete button */}
                  <button onClick={() => handleDelete(product.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
