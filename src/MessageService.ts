import * as express from 'express';
import { API_VERSION } from '../config';
import appRouter from './routes';

const server = express();
server.use(express.json());
server.use(API_VERSION, appRouter);

export { server };
