import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const PATCH= async(req)=>{
  const body = await req.json();
  

   const result = await dbConnect('productCart').updateOne(
    { productId: body.productId },
    {
      $set: { "orders.$[elem].quantity": body.newQuantity }
    },
    {
      arrayFilters: [{ "elem.email": body.email }]
    }
  );

  console.log('Update result:', result);
 
  // return NextResponse.json({'res to ui':'updated'});
    return NextResponse.json({ 'res to ui': 'updated', result });
}
