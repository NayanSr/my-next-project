import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"

export const GET= async()=>{
	const session=await getServerSession();
	// console.log('session:',session);
	const email= session?.user?.email;
	console.log(email);
	const result = await dbConnect('orders').find({'userEmail':email}).toArray();
	return NextResponse.json(result)
}

export const POST=async(request)=>{
	const data= await request.json();  
	// here check is product exist in db. data = [{productId,name,orders:[{email,quantity},{email,quantity}]},{}]
	 const ordersCollection=  dbConnect('orders');
	const result= await ordersCollection.insertMany(data); 

	console.log(data);

	return NextResponse.json(result)
	// return NextResponse.json({"result":"res"})
}