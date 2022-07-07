import { Router } from 'express';
import { getAuthorsList } from '../controllers/authors.js';
const router = Router();

router.get('/', getAuthorsList);

export default router;