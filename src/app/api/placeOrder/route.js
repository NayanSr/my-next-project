import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server"

export const POST=async(request)=>{
	const data= await request.json();  // here data is a array of objects
	 const ordersCollection=  dbConnect('orders');
	const result= await ordersCollection.insertMany(data); 

	console.log(data);

	return NextResponse.json(result)
	// return NextResponse.json({"result":"res"})
}