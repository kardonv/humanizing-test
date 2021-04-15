import { CreateMessageInput, Message, MessageListFilter } from "../proto/message_pb";
import getMessageList from "./getMessages";
import createMessage from "./createMessage";

async function run() {
  console.log('########## Create message ##########');

  const msg = new CreateMessageInput();
  msg.setOrigin('origin_1');
  msg.setCategory('category_1');
  msg.setMessage('test message');
  
  const createdMessage = await createMessage(msg);
  console.log('Created message: ', createdMessage);

  console.log('#####################################\n');

  console.log('########## Get message list ##########');
  
  const filter = new MessageListFilter();
  filter.setPagetoken(0);
  filter.setPagesize(10);
  const list = await getMessageList(filter);
  console.log('Message list: ', list);

  console.log('#################################');
}

run();