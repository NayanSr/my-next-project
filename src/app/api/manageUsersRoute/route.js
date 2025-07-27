import dbConnect from "@/lib/dbConnect"
import { NextResponse } from "next/server"

export const GET = async () => {
      const usersCollection = dbConnect('users');
      const result = await usersCollection.find().toArray();
      return NextResponse.json(result)
}