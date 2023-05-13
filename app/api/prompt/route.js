import Post from "@models/postModel";
import { connectToDb } from "@utils/database";

export const GET=async(req)=>{    
    try {
        await connectToDb()
        const posts = await Post.find().populate('creator');
        return new Response(JSON.stringify(posts),{status:201})
    } catch (error) {
        return new Response("Some Error Occured",{status:501})
    }
}