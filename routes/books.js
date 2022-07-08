import { Router } from 'express';
import { getBookList, getBookById, createBook, deleteBook } from '../controllers/books.js';
import { auth } from '../middlewares/auth.js';
const router = Router();
// Get
router.get('/', getBookList);
router.get('/:id', getBookById);
// Post 
router.post('/', auth, createBook);
// delete
router.delete('/deleteBook/:id', auth, deleteBook)

export default router;