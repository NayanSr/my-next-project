import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const DELETE= async (req)=>{
const body= await req.json();    // { id: '685f7778f848a16e8eb6683f', email: 'nayansuter33@gmail.com' }
const cartProduct= await dbConnect('productCart');

// implement delete only {email:'abc@g.c', qty:4}
const result= await cartProduct.updateOne({productId:body.id},
      { $pull: { orders: { email: body.email } } }
)

return NextResponse.json({result})
}