import { model, Schema } from 'mongoose';
import { MessageType } from './types/MessageType';

export * from './types/MessageType';

const messageSchema = new Schema({
    category: {
        type: String,
        required: true,
        unique: true,
    },
    origin: {
        type: String,
        required: true,
        minlength: 8,
        select: false,
    },
    message: {
        type: String,
        required: true,
        maxlength: 25,
    },
}, {
    timestamps: true,
    versionKey: false,
});

export const Message = model<MessageType>('message', messageSchema);
