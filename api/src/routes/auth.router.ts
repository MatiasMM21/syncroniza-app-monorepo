import { Router } from 'express';
import { login, register, logout, getProfile } from '../controllers/auth.controller';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
router.get('/profile', getProfile);

export default router;
