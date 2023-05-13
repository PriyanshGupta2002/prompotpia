import {Schema,model,models} from "mongoose" 
const promptPostSchema= new Schema({
    creator:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    prompt:{
        type:"String",
        required:[true,"Prompt is required"]
    },
    tag:{
        type:"String",
        required:[true,"Tag is required"]
    }
},)

const Post = models.Post || model('Post',promptPostSchema)
export default Post