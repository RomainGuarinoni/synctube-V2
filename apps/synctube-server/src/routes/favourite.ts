import { Router } from 'express';
import { getFavouriteVideo, addFavouriteVideo } from '../controllers/favourite';

const router = Router();

router.get('/', getFavouriteVideo);
router.post('/', addFavouriteVideo);

export { router as favouriteRouter };
