import Prompt from "@/models/prompt.model"
import { connectToDatabase } from "@/utils/database"


export const GET = async (request, { params }) => {
  try {
      await connectToDB()

      const prompt = await Prompt.findById(params.id).populate("creator")
      if (!prompt) return new Response("Prompt Not Found", { status: 404 });

      return new Response(JSON.stringify(prompt), { status: 200 })

  } catch (error) {
      return new Response("Internal Server Error", { status: 500 });
  }
}

export const PATCH = async(req, {params})=> {
      const {tag,prompt} = await req.json()
      try {
         await connectToDatabase()
         const existingPrompt = await Prompt.findById(params.id)
         if(!existingPrompt) {
            throw new Error('prompt not found')
         }
         existingPrompt.prompt = prompt
         existingPrompt.tag = tag 
         await existingPrompt.save()
         
         return new Response('the prompt has been updated successfuly', {status: 200})
      } catch (error) {
        console.log(error)
        return new Response('failed to update the prompt', {status: 500})
      }
}
export const DELETE = async(req,{params})=> {
   try {
     await connectToDatabase()
     await Prompt.findByIdAndDelete(params.id)
     
     return new Response('prompt has been deleted successfuly', {status: 200})
   } catch (error) {
      console.log(error)
      return new Response('failed to delete prompt', {status: 500})
   }
}