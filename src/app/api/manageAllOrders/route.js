import dbConnect from "@/lib/dbConnect"
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        // const db = await dbConnect();
        const ordersCollection = dbConnect("orders");

        const orderedProducts = await ordersCollection.find().toArray();

        return NextResponse.json({ success: true, data: orderedProducts });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Failed to fetch orders", error: error.message },
            { status: 500 }
        );
    }

}