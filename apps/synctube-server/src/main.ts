import 'dotenv/config';
import * as express from 'express';
import * as cors from 'cors';

import { historyRouter } from './routes/history';

import { log } from './middlewares/log';
import { favouriteRouter } from './routes/favourite';
import { connect } from './database/connect';
import { userRouter } from './routes/user';

const app = express();

const PORT = process.env.port || 3333;

app.use(express.json());

// TODO UPDATE THIS
app.use(cors({ origin: 'http://localhost:4200' }));

app.use(log);

app.use('/api/history', historyRouter);
app.use('/api/favourite', favouriteRouter);
app.use('/api/user', userRouter);

const server = app.listen(PORT, () => {
  connect();

  console.log(`Listening at http://localhost:${PORT}`);
});

server.on('error', console.error);
