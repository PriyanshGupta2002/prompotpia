import Post from "@models/postModel"
import { connectToDb } from "@utils/database"

export const GET = async(req,{params})=>{
    try {
       await connectToDb()
       const post = await Post.findById(params.id).populate('creator')
       if (!post) {
       return new Response("No post found",{status:404})
       }
       return new Response(JSON.stringify(post),{status:201})
    } catch (error) {
       return new Response("Cannot fetch post",{status:500})
    }
}

export const PATCH = async(request,{params})=>{
    try {
        await connectToDb()
        const updatedItems = await request.json()
        const post = await Post.findByIdAndUpdate(params.id,{
           ...updatedItems
        },{new:true})
        return new Response(post,{status:201})
    } catch (error) {
        return new Response(error,{status:500})
    }
}


export const DELETE = async(request,{params})=>{
    try {
        await connectToDb()
        const post = await Post.findByIdAndDelete(params.id)
        return new Response(post,{status:201})
    } catch (error) {
        return new Response(error,{status:500})
    }
}