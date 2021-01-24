import { Router } from 'express';

import SignInController from '../controllers/SignInController';
import SignUpController from '../controllers/SignUpController';
import UserController from '../controllers/UserController';

import CheckAuth from '../middlewares/auth';

const authRoutes = Router();

authRoutes.post('/signin', SignInController.index);
authRoutes.post('/recovery', SignInController.show);
authRoutes.post('/newpass', SignInController.update);
authRoutes.post('/signup', CheckAuth, SignUpController.store);
authRoutes.post('/signup/confirm', SignUpController.update);
authRoutes.get('/user', UserController.show);

export default authRoutes;
