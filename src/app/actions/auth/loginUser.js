"use server"

import dbConnect from "@/lib/dbConnect";

export const loginUser= async (payload)=>{
      const {email, password}= payload;
      const userCollection= dbConnect('users');
      const user= userCollection.findOne({email});
     
      if(!user){return null}

       const isCorrectPassword= user.password==password;

       if(!user) return null;

      return user;
}