import { Router } from 'express';
import { UserController } from '../controllers/user';

const router = Router();

router.post('/login', UserController.loginUser);

export { router as userRouter };
