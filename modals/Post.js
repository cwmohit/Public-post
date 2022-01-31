import mongoose, { models } from 'mongoose'

const postSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    picture:{
        type:String,
    },
    gif:{
        type:String,
    }
})

export default mongoose.models.Post || mongoose.model('Post',postSchema)