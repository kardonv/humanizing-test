import { Message, MessageType } from '../orm';
import { CreateMessageInput } from '../types/CreateMessageInput';
import { MessageListFilter } from '../types/MessageListFilter';

export class MessageController {
    static async messageList(filter: MessageListFilter) {
        const { pageSize, pageToken } = filter;

        delete filter.pageSize;
        delete filter.pageToken;

        const findQuery: { [key: string]: any } = {};

        if (filter.message) {
            findQuery.message = { $regex: filter.message, $options: 'ig' };
        }

        delete filter.message;

        for(const [key, value] of Object.entries(filter)){
            findQuery[key] = value;
        }

        const messages = await Message.find(findQuery)
            .skip(pageToken || 0)
            .limit(pageSize || 10);

        return messages;
    }

    /**
     * Creates message
     *
     * @param {CreateMessageInput} message - input message date
     * @returns {Promise<MessageType}
     */
    static async createMessage(message: CreateMessageInput): Promise<MessageType> {
        const entity = await Message.create(message);

        return entity;
    }
}
