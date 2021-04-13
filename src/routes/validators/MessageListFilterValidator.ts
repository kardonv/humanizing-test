import { ParamSchema } from 'express-validator';

export const MessageListFilterValidator: {
    [key: string]: ParamSchema
} = {
    category: {
        in: 'query',
        optional: true,
    },
    origin: {
        in: 'query',
        optional: true,
    },
    message: {
        in: 'query',
        optional: true,
    },
    pageSize: {
        in: 'query',
        optional: true,
        toInt: true,
    },
    pageToken: {
        in: 'query',
        optional: true,
        toInt: true,
    },
};
