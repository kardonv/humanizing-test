import * as grpc from 'grpc';
import { dbConfig } from './config';
import { MessageServiceService } from './proto/message_grpc_pb'

import { MessageServer } from './src/MessageSever';

!module.parent && (async () => {
    await dbConfig();

    const server = new grpc.Server();
    server.addService(MessageServiceService, new MessageServer());

    const port = 3000;
    const uri = `localhost:${port}`;
    console.log(`Listening on ${uri}`);
    server.bind(uri, grpc.ServerCredentials.createInsecure());

    server.start();
})();
