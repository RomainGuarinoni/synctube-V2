import { Router } from 'express';
import { getFavouriteVideo } from '../controllers/favourite';

const router = Router();

router.get('/', getFavouriteVideo);

export { router as favouriteRouter };
