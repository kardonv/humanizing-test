import { model, Schema } from 'mongoose';
import { MessageType } from './types/MessageType';

export * from './types/MessageType';

const messageSchema = new Schema({
    category: {
        type: String,
        required: true,
    },
    origin: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});

export const Message = model<MessageType>('message', messageSchema);
