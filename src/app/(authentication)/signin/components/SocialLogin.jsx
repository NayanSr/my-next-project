'use client'
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SocialLogin() {
    const router = useRouter()
    const session = useSession()

    const handleSocialLogin = async (providerName) => {
        signIn(providerName);

    }
    useEffect(() => {
        if (session?.status == "authenticated") {
            alert("Logged in successfully")
            router.push('/');
        }

    }, [session?.status])

    return (

        <div className="flex justify-around">
            {/* Add Google Icon */}
            <button onClick={() => handleSocialLogin("google")} className='cursor-pointer  rounded-lg bg-emerald-900 p-2 text-rose-400 text-2xl font-semibold'>Google</button>

            <button onClick={() => handleSocialLogin('github')} className='cursor-pointer p-2 rounded-lg bg-blue-700 text-rose-200  ml-4 text-2xl font-semibold'>GitHub</button>

        </div>

    )
}