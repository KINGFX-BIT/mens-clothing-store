import express from 'express';
import { getDashboardStats, getAllUsers, deleteUser } from '../controllers/adminController';
import { protect, admin } from '../middleware/auth';

const router = express.Router();

router.get('/dashboard', protect, admin, getDashboardStats);
router.get('/users', protect, admin, getAllUsers);
router.delete('/users/:id', protect, admin, deleteUser);

export default router;
