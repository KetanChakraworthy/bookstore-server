import mongoose from 'mongoose';
import Authors from '../models/authors.js';
    
// Get All Author
export const getAuthorsList = async (req, res) => {
    let errors = null;
    let results = null;
    try {
        const authors = await Authors.find({});
        results = authors;
        errors = null;
        res.status(200).json({ results, errors });
        
    } catch (error) {
        results = null;
        errors = error;
        res.status(500).json({ results, errors });
    }
}

// Get Author by Id
export const getAuthorById = async (req, res) => {
    let results = null;
    let errors = null;
    const { id } = req.params;
    try {
        const author = await Authors.findById(id);
        if (!author) {
            results = null;
            errors = { message: 'Author with this id does not exist' };
            return res.status(404).json({ results, errors });
        }
        results = author;
        errors = null;
        res.status(200).json({ results, errors });

    } catch (error) {
        results = null;
        errors = error
        res.status(500).json({ results, errors });
    }

}

// Create Author
export const createAuthor = async (req, res) => {
    let results = null;
    let errors = null;
    const author = req.body;
    if (!req.userId) {
        results = null;
        errors = { message: 'Login to Create Author' };
        res.status(400).json({ results, errors })
    }
    const newAuthor = new Authors({ ...author, createdBy: req.userId });
    try {
        await newAuthor.save();
        results = author;
        errors = null;
        res.status(200).json({ results, errors });
    } catch (error) {
        errors = error
        results = null
        res.status(500).json({ results, errors });
    }
}

// Delete Author
export const deleteAuthor = async (req, res) => {
    let results = null;
    let errors = null;
    const { id } = req.params;
    if (!req.userId) {
        results = null;
        errors = { message: 'Login to Delete Author' };
        res.status(400).json({ results, errors })
    }

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            results = null;
            errors = { message: 'Not a Valid Id' };
            return res.status(404).json({ results, errors });
        }
        const deletedAuthor = await Authors.findByIdAndRemove(id);
        if (!deletedAuthor) {
            results = null;
            errors = { message: 'Author with Id does not Exist' };
            return res.status(404).json({ results, errors });
        }
        results = { message: 'Author has been deleted Succuessfully' };
        errors = null;
        res.status(200).json({ results, errors });
    } catch (error) {
        results = null;
        errors = error;
        res.status(500).json({ results, errors });
    }
}