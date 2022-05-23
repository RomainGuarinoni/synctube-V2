import * as express from 'express';

import { login, redirectToGoogleAuthPrompt } from '../controllers/login';

const router = express.Router();

router.get('/', redirectToGoogleAuthPrompt);
router.post('/', login);

export { router as loginRouter };
