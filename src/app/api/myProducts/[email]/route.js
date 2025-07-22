import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const GET=async(req,{params})=>{
      const {email}=await params;
      console.log(email);
      const productCollection= dbConnect('products');
      const result = await productCollection.find({email}).toArray();
      return NextResponse.json(result);
}