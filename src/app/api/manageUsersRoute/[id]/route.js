import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

//! Dismiss or accept users role change request
export const PATCH = async (req, { params }) => {
	try {
		const { id } =await params; //deepseek says no need for await
		const data = await req.json();

		console.log('Received data:', data);
		console.log('User ID:', id);

		const userCollection = dbConnect('users');

		let updateRes;

		if (data?.action ==='seller' || data?.action ==='admin') {
			
			updateRes = await userCollection.updateOne(
				{ _id: new ObjectId(id) },
				{ $set: { role: data.action } } // example; adjust as needed
			);

			const roleChangeRes = await userCollection.updateOne(
				{ _id: new ObjectId(id) },
				{ $set: { wantToBe: '' } }
			);
			return NextResponse.json({ roleChangeRes, wantToBeReset: roleChangeRes });
		}
		
		
		else {
			// Default case: reset wantToBe
			updateRes = await userCollection.updateOne(
				{ _id: new ObjectId(id) },
				{ $set: { wantToBe: '' } }
			);
			return NextResponse.json(updateRes);
		}
	}
	
	
	catch (error) {
		console.error('Error updating user:', error);
		return NextResponse.error('Failed to update user');
	}
};


//! Delete a user from database
export const DELETE= async (req,{params})=>{
	const {id}= await params;
	const result = await dbConnect('users').deleteOne({_id: new ObjectId(id)})

	return NextResponse.json({result})
}
