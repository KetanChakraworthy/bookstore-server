import mongoose from "mongoose";

const booksSchema = mongoose.Schema({
    name: String,
    published: String,
    price: Number,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Authors' }
})

const booksModel = mongoose.model('Authors', booksSchema);

export default booksModel;