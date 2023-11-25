

import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs'
import { connectToDatabase } from "@/utils/database"
import User from "@/models/user.model"
export const POST = async (req)=> {
     
   
     try {
        const { name, email, password } = await req.json()
         await connectToDatabase()
         const hashedPassword = await bcrypt.hash(password,10)
          await User.create({
            username: name , email, password: hashedPassword
         })
         
   
        return  NextResponse.json({message: 'User has been registered successfuly'}, {status: 201})
     } catch (error) {
        return NextResponse.json({message: 'failed to register' } , {status: 500})
     }
     
}