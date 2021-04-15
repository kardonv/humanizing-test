import { Message, MessageListFilter } from "../proto/message_pb";
import { client } from "./utils";

export default function getMessageList(filter: MessageListFilter) {
  return new Promise(resolve => {
    const stream = client.getMessageList(filter);
    const arr: Message[] = [];

    stream.on('data', (chunk: any) => {
      arr.push(chunk.toObject());
    });

    stream.on('error', (err) => {
      console.log('Err: ', err);
    })

    stream.on('end', () => {
      resolve(arr);
    })
  });
}