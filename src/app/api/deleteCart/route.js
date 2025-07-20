import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const DELETE= async (req)=>{
      const body= await req.json();
      console.log(body);
      const cartCollection= await dbConnect('productCart');
      const result= await cartCollection.deleteMany({"orders.email":body.email})
      return NextResponse.json(result)
}