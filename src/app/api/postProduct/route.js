import dbConnect from "@/lib/dbConnect"
import { NextResponse } from "next/server"

export const POST= async (req)=>{
      const data= await req.json()
      console.log(data)
      const productCollection= await dbConnect('products')
      const result= await productCollection.insertOne(data)
      return NextResponse.json(result)
}


/* 
export const DELETE= async (req)=>{
      const body= await req.json();
      console.log(body);
      const cartCollection= await dbConnect('productCart');
      const result= await cartCollection.deleteMany({"orders.email":body.email})
      return NextResponse.json(result)
}
*/