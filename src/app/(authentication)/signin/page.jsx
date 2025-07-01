
'use client'
import React from 'react'
import loginImage from '../../../../public/login.jpg'
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';


const page = () => {
      const router = useRouter()
      const handleSubmit = async (e) => {
            e.preventDefault();
            const form = e.target;
            const password = form.password.value;
            const email = form.email.value;
            console.log(email, password)
            try {
                  const response = await signIn("credentials", { email, password, callbackUrl: "/", redirect: false });
                  console.log(response)

                  if (response.ok) {
                        router.push('/');
                        form.reset()
                  }
                  else {
                        alert("Else Login Failed")
                  }

            } catch (error) {
                  console.log(error);
                  alert('Catch Login failed')
            }
            // Add your API call here
      };


      return (
            <div className="hero bg-orange-900 max-w-4xl mx-auto mt-16 py-8 rounded-lg">
                  <div className="hero-content grid grid-cols-12">

                        <div className="text-center col-span-12 md:col-span-7 p-4">
                              <Image src={loginImage} alt='Signin image' />
                        </div>

                        <div className="col-span-12 md:col-span-5 mx-auto p-6 border-4 border-orange-800 rounded-lg shadow w-full ">
                              <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
                              <form onSubmit={handleSubmit} className="space-y-4">


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
                                          Signin
                                    </button>
                              </form>
                              <div className="divider">OR</div>
                              <div>
                                    <button className='cursor-pointer w-12 h-12 rounded-full bg-emerald-700 text-rose-400 text-4xl font-semibold'>G</button>
                              </div>
                              <div className="divider">New User?</div>
                              <Link href='/signup' className='text-blue-600 underline'>Please Signup</Link>
                        </div>
                  </div>
            </div>
      )
}

export default page 