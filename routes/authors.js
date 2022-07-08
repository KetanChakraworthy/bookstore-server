import { Router } from 'express';
import { getAuthorsList, getAuthorById, createAuthor, deleteAuthor } from '../controllers/authors.js';
import { auth } from '../middlewares/auth.js'
const router = Router();

// Get
router.get('/', getAuthorsList);
router.get('/:id', getAuthorById);
// Post
router.post('/', auth, createAuthor);
// Delete
router.delete('/deleteAuthor/:id', auth, deleteAuthor);


export default router;