
import Prompt from "@/models/prompt.model";
import { connectToDatabase } from "@/utils/database";


export const GET = async (request) => {
    try {
        await connectToDatabase()

        // Fetch prompts and sort by the latest ones using _id in descending order
        const prompts = await Prompt.find({}).sort({ _id: -1 }).populate('creator');
        console.log(prompts);

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}
