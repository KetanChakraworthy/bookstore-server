import { Router } from 'express';
import { signin, signup } from '../controllers/user.js';
const router = Router();

// Sign Up
router.post('/signup', signup);
// Sign IN
router.post('/signIn', signin);

export default router;