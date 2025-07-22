'use client'

import { useSession } from "next-auth/react";

export default function Page() {
      const {data:session}= useSession()
  const handlePost =async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email= session?.user?.email;
    const description = form.description.value;
    const price = form.price.value;
    const offerPrice = form.offerPrice.value;
    const category = form.category.value;
    const date = form.date.value;
    const image = [form.image.value];
    // const name = form.name.value;
    const data= {name,email,description,price,offerPrice,category,date,image}
    // console.log(data);
    const response = await fetch('http://localhost:3000/api/postProduct', {
  method: "POST",
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify( data ) // this is fine if server expects body.data
});
    console.log(response)
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h3 className="text-2xl font-semibold mb-4 text-center text-gray-800">Add A Product</h3>
      <form onSubmit={handlePost} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter product name"
            className="w-full px-3 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label htmlFor="userId" className="block mb-2 text-sm font-medium text-gray-700">
            email:
          </label>
          <input
            type="email"
            id="userId"
            name="email"
            // placeholder={session?.user?.email}
            defaultValue={session?.user?.email}
            className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            readOnly
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">
            Description:
          </label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Product description"
            className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-700">
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label htmlFor="offerPrice" className="block mb-2 text-sm font-medium text-gray-700">
          Offered Price:
          </label>
          <input
            type="number"
            id="offerPrice"
            name="offerPrice"
            placeholder="Offered Price"
            className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-700">
          Product Category:
          </label>
          <input
            type="text"
            id="category"
            name="category"
            placeholder="Product Category"
            className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-700">
          Created Date:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            placeholder="Product Posted Date"
            className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-700">
          Product Image:
          </label>
          <input
            type="text"
            id="image"
            name="image"
            placeholder="Product Photo URL"
            className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>



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