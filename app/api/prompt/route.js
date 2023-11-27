
import Prompt from "@/models/prompt.model";
import { connectToDatabase } from "@/utils/database";


import { revalidatePath } from "next/cache";
export const GET = async (request) => {

    try {
        await connectToDatabase()

        // Fetch prompts and sort by the latest ones using _id in descending order
        // get also the user document  
        const prompts = await Prompt.find({}).sort({ _id: -1 }).populate('creator');
             
        const path = request.nextUrl.searchParams.get('path') || '/'
        revalidatePath(path)
        return new Response(JSON.stringify(prompts), { status: 200, headers: { 'Cache-Control': 's-maxage=1, stale-while-revalidate' } })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}
