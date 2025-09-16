import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import dbConnect from "@/lib/dbConnect";

export async function PATCH(req, { params }) {
    const { id } = await params;
    const { status } = await req.json();
    try {
        const ordersCollection = dbConnect("orders");
        const result = await ordersCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { status } }
        );
        if (result.modifiedCount === 0) {
            return NextResponse.json(
                { error: "Order not found or not updated" },
                { status: 404 }
            );
        }
        return NextResponse.json({ success: true, id, status });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
