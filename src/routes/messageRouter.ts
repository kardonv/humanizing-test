import {
    NextFunction,
    Request,
    Response,
    Router,
} from 'express';
import { checkSchema, validationResult } from 'express-validator';
import { MessageController } from '../controllers/MessageController';
import {
    CreateMessageValidator,
    MessageListFilterValidator,
} from './validators';

const router = Router();


router.route('/')
    .get(checkSchema(MessageListFilterValidator),
        async (req: Request, res: Response) => {
            const messages = await MessageController.messageList(req.query);

            return res.status(200).json(messages);
        })
    .post(checkSchema(CreateMessageValidator),
        async (req: Request, res: Response) => {
            const validatedResult = validationResult(req);

            if (!validatedResult.isEmpty()) {
                return res.status(400).json(validatedResult.mapped());
            }

            const message = await MessageController.createMessage(req.body);

            res.status(201).send(message);
        },
    );

export default router;
