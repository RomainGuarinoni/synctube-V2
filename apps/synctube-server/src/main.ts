import 'dotenv/config';
import * as express from 'express';
import * as cors from 'cors';

import { loginRouter } from './routes/login';
import { log } from './middlewares/log';

const app = express();

const PORT = process.env.port || 3333;

app.use(express.json());

app.use(cors({ origin: 'http://localhost:4200' }));

app.use(log);

app.use('/api/login', loginRouter);

const server = app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});

server.on('error', console.error);
