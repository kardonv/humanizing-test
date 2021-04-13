import { Router } from 'express';
import messageRouter from './messageRouter';

const appRoter = Router();

appRoter.use('/messages', messageRouter);


export default appRoter;