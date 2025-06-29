'use client';
import Image from 'next/image';
import registerImage from '../../../../public/signup.jpg'
import Link from 'next/link';

export default function SimpleSignupForm() {

      const handleSubmit = (e) => {
            e.preventDefault();
            const form = e.target;
            const userName = form.name.value;
            const password = form.password.value;
            const email = form.email.value;
            const data = { userName, email, password }
            
            console.log('Signup data:', data);
            // Add your API call here
      };

    
      return (
            <div className="hero bg-orange-900 max-w-4xl mx-auto mt-16 py-8 rounded-lg">
                  <div className="hero-content grid grid-cols-12">

                        <div className="text-center col-span-12 md:col-span-7 p-4">
                              <Image src={registerImage} alt='Signup image' />
                        </div>

                        <div className="col-span-12 md:col-span-5 mx-auto p-6 border-4 border-orange-800 rounded-lg shadow w-full ">
                              <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                              <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                          <label className="block mb-1">Full Name</label>
                                          <input
                                                type="text"
                                                name="name"
                                                placeholder='Your Name'
                                                className="w-full p-2 border rounded"
                                                required
                                          />
                                    </div>

                                    <div>
                                          <label className="block mb-1">Email</label>
                                          <input
                                                type="email"
                                                name="email"

                                                className="w-full p-2 border rounded"
                                                required
                                          />
                                    </div>

                                    <div>
                                          <label className="block mb-1">Password</label>
                                          <input
                                                type="password"
                                                name="password"

                                                className="w-full p-2 border rounded"
                                                required
                                                minLength="6"
                                          />
                                    </div>

                                    <button
                                          type="submit"
                                          className="cursor-pointer w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                                    >
                                          Create Account
                                    </button>
                              </form>
                              <div className="divider">OR</div>
                              <div>
                                    <button className='cursor-pointer w-12 h-12 rounded-full bg-emerald-700 text-rose-400 text-4xl font-semibold'>G</button>
                              </div>
                               <div className="divider">Have an Account?</div>
                               <Link href='/signin' className='text-blue-600 underline'>Please Signin</Link>
                        </div>
                  </div>
            </div>
      );
}

