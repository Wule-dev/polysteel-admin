import { Router } from 'express';
import CheckAuth from '../middlewares/auth';

const paymentRoutes = Router();

paymentRoutes.get('/payment', CheckAuth, (req, res) => res.json({ message: 'Sistema de pagamento' }));

export default paymentRoutes;
