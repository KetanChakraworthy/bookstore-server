import { Router } from 'express';
import { getBooksList } from '../controllers/books.js';
const router = Router();

router.get('/', getBooksList);

export default router;