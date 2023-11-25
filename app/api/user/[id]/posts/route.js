import Prompt from "@/models/prompt.model"
import { connectToDatabase } from "@/utils/database"

export const GET = async (req, {params})=> {
   try {
     await connectToDatabase()
     const prompt = await Prompt.find({creator: params.id}).populate('creator')
     return new Response(JSON.stringify(prompt), {status: 200})
   } catch (error) {
      console.log(error)
      return new Response('failed to fetch user prompts', {status:500})
   }
}