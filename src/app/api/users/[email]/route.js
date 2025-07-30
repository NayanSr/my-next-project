import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET= async (req,{params})=>{
	const {email}= await params;

	const result= await dbConnect('users').findOne({email})
	return NextResponse.json(result)
}


export const PATCH= async (req, {params})=>{
	const {email}= await params;
	const body= await req.json();
	console.log('email :', email, 'body :', body?.Role);
	const usersCollection= await dbConnect('users');
	const result= await usersCollection.updateOne({email},{$set:{wantToBe:body?.Role}})

	return NextResponse.json(result)
}



