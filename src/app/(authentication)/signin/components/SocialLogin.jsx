import { signIn } from "next-auth/react";

export default function SocialLogin() {
    const handleSocialLogin = async (providerName) => {
        console.log(providerName);
        const result = await signIn(providerName, { redirect: false });
        console.log(result);
    }

    return (

        <div className="flex justify-around">
            {/* Add Google Icon */}
            <button onClick={() => handleSocialLogin("google")} className='cursor-pointer  rounded-lg bg-emerald-900 p-2 text-rose-400 text-2xl font-semibold'>Google</button>

            <button onClick={() => handleSocialLogin('github')} className='cursor-pointer p-2 rounded-lg bg-blue-700 text-rose-200  ml-4 text-2xl font-semibold'>GitHub</button>

        </div>

    )
}