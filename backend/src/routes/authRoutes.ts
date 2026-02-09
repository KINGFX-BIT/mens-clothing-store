import express from 'express';
import { register, login, getProfile, updateProfile } from '../controllers/authController';
import { protect } from '../middleware/auth';
import { registerValidation, loginValidation } from '../middleware/validation';

const router = express.Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

export default router;
