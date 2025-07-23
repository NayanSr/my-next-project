import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET=async(req,{params})=>{
      const {email}=await params;
      console.log(email);
      const productCollection= dbConnect('products');
      const result = await productCollection.find({email}).toArray();
      return NextResponse.json(result);
}

export const DELETE= async (req,{params})=>{
      const {email}= await params;
      console.log(email);
      const productsCollection= await dbConnect('products');
      const result= await productsCollection.deleteOne({_id: new ObjectId(email)})


      return NextResponse.json(result)
}

export const PATCH= async (req, {params})=>{
      const {email}= await params;
      const data= await req.json();
      const result= await dbConnect('products').updateOne({_id: new ObjectId(email)},{$set:data})
      return NextResponse.json(result)
}

