import Post from "@models/postModel";
import { connectToDb } from "@utils/database";

export const POST = async (request) => {
    const { creator, prompt, tag } = await request.json();

    try {
        await connectToDb();
        const newPrompt = new Post({ creator, prompt, tag });

        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        return new Response(error, { status: 500 });
    }
}