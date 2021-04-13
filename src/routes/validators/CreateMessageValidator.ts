import { ParamSchema } from 'express-validator';
import {
    REQUIRED_ERROR,
} from './constants';

export const CreateMessageValidator: {
    [key: string]: ParamSchema
} = {
    category: {
        in: 'body',
        trim: true,
        exists: {
            errorMessage: REQUIRED_ERROR,
        },
    },
    origin: {
        in: 'body',
        exists: {
            errorMessage: REQUIRED_ERROR,
        },
    },
    message: {
        in: 'body',
        trim: true,
        exists: {
            errorMessage: REQUIRED_ERROR,
        },
    },
};
