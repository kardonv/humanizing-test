import { ServerWritableStream } from "grpc";
import { sendUnaryData, ServerUnaryCall } from "grpc";
import { IMessageServiceServer } from "../proto/message_grpc_pb";
import { CreateMessageInput, Message, MessageListFilter } from "../proto/message_pb";
import { Message as Msg, MessageType } from './orm';

/**
 * 
 * @param {MessageType} message - entity from DB
 * @returns 
 */
function mapToGrpcMessage(message: MessageType) {
    const m = new Message();
    m.setId(message._id.toString());
    m.setOrigin(message.origin);
    m.setCategory(message.category);
    m.setMessage(message.message);
    m.setDate(message.createdAt.toISOString());

    return m;
}

export class MessageServer implements IMessageServiceServer {
    async getMessageList(call: ServerWritableStream<MessageListFilter>) {
        const filter = MessageListFilter.deserializeBinary(call.request.serializeBinary()).toObject();
        const messages = await Msg.find({}).skip(filter.pagetoken).limit(filter.pagesize);

        for (const message of messages) {
            call.write(mapToGrpcMessage(message));
        }
    }

    async createMessage(call: ServerUnaryCall<CreateMessageInput>, callback: sendUnaryData<Message>) {
        const input = CreateMessageInput.deserializeBinary(call.request.serializeBinary()).toObject();
        const messageEntity = await Msg.create(new Msg(input));

        return callback(null, mapToGrpcMessage(messageEntity));
    }
}