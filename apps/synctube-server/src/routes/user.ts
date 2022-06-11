import { Router } from 'express';
import { loginUser } from '../controllers/user';

const router = Router();

router.post('/login', loginUser);

export { router as userRouter };
