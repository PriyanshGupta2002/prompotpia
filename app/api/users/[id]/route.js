import Post from "@models/postModel"
import { connectToDb } from "@utils/database"

export const GET=async(req,{params})=>{
    try {
        await connectToDb()
        const posts = await Post.find({creator:params.id}).populate('creator')
        return new Response(JSON.stringify(posts),{status:201});
    } catch (error) {
        return new Response("Failed to fetch posts",{status:500})
    }
}