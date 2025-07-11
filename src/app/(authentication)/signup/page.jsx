'use client';
import Image from 'next/image';
import registerImage from '../../../../public/signup.jpg'
import Link from 'next/link';
import { registerUser } from '@/app/actions/auth/registerUser';
import { useRouter } from 'next/navigation';
import SocialLogin from '../signin/components/SocialLogin';

export default function SimpleSignupForm() {
      const router = useRouter()

      const handleSubmit = async (e) => {
            e.preventDefault();
            const form = e.target;
            const userName = form.name.value;
            const password = form.password.value;
            const email = form.email.value;
            const data = { userName, email, password }
            // await registerUser(data)
            try {
                  const response = await registerUser(data)
                  if (response.acknowledged) {
                        router.push('/');
                        form.reset()
                  }
            } catch (error) {

            }
      };


      return (
            <div className="hero bg-orange-900 max-w-4xl mx-auto my-12 py-8 rounded-lg">
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
                                    <SocialLogin />
                              </div>
                              <div className="divider">Have an Account?</div>
                              <Link href='/signin' className='text-blue-600 underline'>Please Signin</Link>
                        </div>
                  </div>
            </div>
      );
}

