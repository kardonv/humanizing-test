
import { CreateMessageInput } from "../proto/message_pb";
import { client } from "./utils";

export default function createNewMessage(message: CreateMessageInput) {
  return new Promise(resolve => {
    client.createMessage(message, (err, res) => {
      resolve(res.toObject())
    });
  })

}