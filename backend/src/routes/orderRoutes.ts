import express from 'express';
import {
  createOrder,
  getMyOrders,
  getOrderById,
  createPaymentIntent,
  updateOrderToPaid,
  getAllOrders,
  updateOrderStatus,
} from '../controllers/orderController';
import { protect, admin } from '../middleware/auth';
import { orderValidation } from '../middleware/validation';

const router = express.Router();

router.post('/', protect, orderValidation, createOrder);
router.get('/my-orders', protect, getMyOrders);
router.post('/payment-intent', protect, createPaymentIntent);
router.get('/all', protect, admin, getAllOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, updateOrderToPaid);
router.put('/:id/status', protect, admin, updateOrderStatus);

export default router;
