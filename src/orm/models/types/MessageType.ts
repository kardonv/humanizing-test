import { Document } from 'mongoose';

export type MessageType = Document & {
    category: string;
    origin: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
};
