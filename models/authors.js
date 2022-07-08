import mongoose from "mongoose";

const authorsSchema = mongoose.Schema({
    name: { type:String, required:true },
    dob: String,
    age: Number,
    books: { type: Array, "default": [] },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

const Author = mongoose.model('Authors', authorsSchema);

export default Author;