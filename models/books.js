import mongoose from "mongoose";

const booksSchema = mongoose.Schema({
    name: { type: String, required: true },
    published: String,
    price: Number,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Authors', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

const Book = mongoose.model('Books', booksSchema);

export default Book;