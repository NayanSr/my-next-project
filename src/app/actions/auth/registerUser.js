"use server"

import dbConnect from "@/lib/dbConnect"

export const registerUser = async (payload) => {


      const usersCollection = dbConnect("users");
      // Validation is email already exist
      const user = await usersCollection.findOne({ email: payload.email })

      if (!user) {
            const result = await usersCollection.insertOne(payload);
            const {acknowledged, insertedId}= result;
            return {acknowledged, insertedId};
      }
      return {success:false};




}