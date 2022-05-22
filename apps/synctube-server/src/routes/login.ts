import * as express from 'express';

import { login, redirectToGoogleAuthPrompt } from '../controllers/login';

const loginRouter = express.Router();

loginRouter.get('/', redirectToGoogleAuthPrompt);
loginRouter.post('/', login);

export { loginRouter };
