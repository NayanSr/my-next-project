'use client'

import { useRouter } from "next/navigation";

const PurchasePage = ({ product }) => {
    const router = useRouter();
    const pd = JSON.parse(product)
    const handleCl = () => {
        // console.log('clicked :', pd);
        router.push(`/purchase?product=${product}`)
    }

    return (
        <div>
            <button className="btn btn-success text-xl " onClick={handleCl}>Purchase</button>
        </div>
    );
};

export default PurchasePage;