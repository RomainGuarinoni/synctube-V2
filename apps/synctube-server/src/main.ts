import 'dotenv/config';
import * as express from 'express';
import * as cors from 'cors';

import { historyRouter } from './routes/history';

import { log } from './middlewares/log';
import { favouriteRouter } from './routes/favourite';

const app = express();

const PORT = process.env.port || 3333;

app.use(express.json());

// TODO UPDATE THIS
app.use(cors({ origin: 'http://localhost:4200' }));

app.use(log);

app.use('/api/history', historyRouter);
app.use('/api/favourite', favouriteRouter);

const server = app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});

server.on('error', console.error);
