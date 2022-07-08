import mongoose from 'mongoose';
import Book from '../models/books.js'

// Get All Books
export const getBookList = async(req,res) => {
    let results = null;
    let errors = null;
    try {
        const books = await Book.find({}).populate('author','name');
        results = books;
        errors = null;
        res.status(200).json({ results, errors });
    } catch (error) {
        results = null;
        errors = error;
        res.status(500).json({ results, errors });
    }
}

// Get Book By Id 
export const getBookById = async (req, res) => {
    let results = null;
    let errors = null;
    const { id } = req.params;
    try {
        const book = await Book.findById(id).populate('author','name');
        if (!book) {
            results = null;
            errors = { message: 'Book with Id does not Exist' };
            return res.status(404).json({ results, errors });
        }
        results = book;
        errors = null;
        res.status(200).json({ results, errors });
    } catch (error) {
        results = null;
        errors = error;
        res.status(500).json({ results, errors });
    }
}

// Create Book 
export const createBook = async (req, res) => {
    let results = null;
    let errors = null;
    const book = req.body;
    if (!req.userId) {
        results = null;
        errors = { message: 'Login to Create Book' };
        res.status(400).json({ results, errors })
    }
    const newBook = new Book({ ...book, createdBy:req.userId });
    try {
        await newBook.save();
        results = book;
        errors = null;
        res.status(200).json({ results, errors });
    } catch (error) {
        results = null;
        errors = error;
        res.status(500).json({ results, errors });
    }
}
// Delete Book
export const deleteBook = async (req, res) => {
    let results = null;
    let errors = null;
    const { id } = req.params;
    if (!req.userId) {
        results = null;
        errors = { message: 'Login to Delete Book' };
        res.status(400).json({ results, errors })
    }
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            results = null;
            errors = { message: 'Not a Valid ID' };
            return res.status(400).json({ results, errors });
        }
        const deletedBook = await Book.findByIdAndRemove(id);
        if (!deletedBook) {
            results = null;
            errors = { message: 'Book with Id does not exist' };
            return res.status(404).json({ results, errors });
        }
        results = { message: 'Book has been Deleted SuccessFully' };
        errors = null;
        res.status(200).json({ results, errors });
    } catch (error) {
        results = null;
        errors = error;
        res.status(500).json({ results, errors });
    }
}