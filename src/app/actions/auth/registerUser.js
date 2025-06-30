"use server"

import dbConnect from "@/lib/dbConnect"

export const registerUser = async (payload) => {


      const usersCollection = dbConnect("users");
      // Validation is email already exist
      const user = await usersCollection.findOne({ email: payload.email })

      if (!user) {
            const result = await usersCollection.insertOne(payload);
            result.insertedId= result.insertedId.toString();
           
            return result;
      }
      return null;

}