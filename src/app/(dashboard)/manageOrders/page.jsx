'use client'
import { useEffect, useState } from "react";

const page = () => {
    const [products, setProducts] = useState([]);
    const [status, setStatus] = useState({});

    const handleStatusChange = async (id, value) => {
        setStatus((prev) => ({ ...prev, [id]: value }));
        try {
            const res = await fetch(`/api/manageAllOrders/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: value }),
            });
            if (res.ok) {
                const updated = await res.json();
                console.log("Updated Order:", updated);
                setProducts((prev) => ({
                    ...prev,
                    data: prev.data.map((p) =>
                        p._id === id ? { ...p, status: value } : p
                    ),
                }));
            }
        } catch (error) {
            console.error("Error updating order:", error);
        }
    };


    // const req = await fetch('http://localhost:3000/api/manageAllOrders');
    // const products = await req.json();

    useEffect(() => {
        fetch('http://localhost:3000/api/manageAllOrders')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    console.log('orders: ', products);

    return (
        <div className="p-6 bg-teal-100">
            <h2 className=" font-semibold mb-4 text-xl text-black">
                Total Orders: {products?.data?.length}
            </h2>

            <div className="overflow-x-auto rounded-lg shadow-md">
                <table className="min-w-full border border-gray-200 bg-white">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                        <tr>
                            <th className="px-6 py-3 text-left">Name</th>
                            <th className="px-6 py-3 text-left">Price</th>
                            <th className="px-6 py-3 text-left">Quantity</th>
                            <th className="px-6 py-3 text-left">Ordered by</th>
                            <th className="px-6 py-3 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-gray-800">
                        {products?.data?.map((pd) => (
                            <tr
                                key={pd._id}
                                className="hover:bg-gray-50 transition-colors duration-200"
                            >
                                <td className="px-6 py-3">{pd.name}</td>
                                <td className="px-6 py-3">${pd.price}</td>
                                <td className="px-6 py-3 text-center">{pd.quantity}</td>
                                <td className="px-6 py-3">{pd.userEmail}</td>
                                <td className="px-6 py-3">
                                    <select
                                        className="border border-gray-300 rounded-lg px-3 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={status[pd._id] || ""}
                                        onChange={(e) => handleStatusChange(pd._id, e.target.value)}
                                    >
                                        <option value="">{pd.status}</option>
                                        <option value="pending">Pending</option>
                                        <option value="approved">✅ Approve</option>
                                        <option value="rejected">❌ Reject</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};


export default page;