import { Router } from 'express';
import { FavouriteController } from '../controllers/favourite';

const router = Router();

router.get('/', FavouriteController.getFavouriteVideo);
router.post('/', FavouriteController.addFavouriteVideo);

export { router as favouriteRouter };
