import { Router } from 'express';
import { getHistoryVideo } from '../controllers/history';

const router = Router();

router.get('/', getHistoryVideo);

export { router as historyRouter };
