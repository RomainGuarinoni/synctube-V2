import 'dotenv/config';
import { createServer } from 'http';
import * as express from 'express';
import * as cors from 'cors';
import { Server } from 'socket.io';
import { ServerToClientEvents, ClientToServerEvents } from '@synctube-v2/types';

import { historyRouter } from './routes/history';

import { favouriteRouter } from './routes/favourite';
import { connect } from './database/connect';
import { userRouter } from './routes/user';
import { roomRouter } from './routes/room';
import { frontUrl } from './config/url';
import { initSocketEvent } from './socket/index';

const PORT = process.env.port || 3333;

const app = express();

const server = createServer(app);

const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: 'http://localhost:4200',
  },
});

io.on('connection', initSocketEvent);

app.use(express.json());

// TODO UPDATE THIS
app.use(cors({ origin: frontUrl }));

app.use('/api/history', historyRouter);
app.use('/api/favourite', favouriteRouter);
app.use('/api/user', userRouter);
app.use('/api/room', roomRouter);

server.listen(PORT, () => {
  connect();

  console.log(`Listening at http://localhost:${PORT}`);
});

server.on('error', console.error);
