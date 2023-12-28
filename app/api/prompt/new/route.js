import Prompt from "@/models/prompt.model"
import { connectToDatabase } from "@/utils/database"
import { revalidatePath } from "next/cache";

export const POST = async(req)=> {
   const { userId, tag, prompt} = await req.json()
   try {
      await connectToDatabase()
      const newPrompt = new Prompt({
        creator: userId, 
        tag,
        prompt
      })

      await newPrompt.save()
      
      return new Response(JSON.stringify(newPrompt), { status: 201})

   } catch (error) {
      console.log(error)
      return new Response('failed to create new prompt', { status: 500})
   }
}