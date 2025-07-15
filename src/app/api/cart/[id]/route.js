
import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const p = await params;
  console.log(p.id)
  const collection = await dbConnect('productCart');
  const cartItem = await collection.findOne({ id: p.id });


  return NextResponse.json(cartItem)
}