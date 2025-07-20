'use client'

export default function Page() {
  const handlePost = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    console.log(name);
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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