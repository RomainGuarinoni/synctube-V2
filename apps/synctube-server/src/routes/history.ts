import { Router } from 'express';
import { HistoryController } from '../controllers/history';

const router = Router();

router.get('/', HistoryController.getHistoryVideo);

export { router as historyRouter };
