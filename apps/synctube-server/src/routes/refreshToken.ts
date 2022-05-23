import { Router } from 'express';
import { refreshAcessToken } from '../controllers/refreshToken';

const router = Router();

router.post('/', refreshAcessToken);

export { router as refreshTokenRouter };
