import { MessageServiceClient } from "../proto/message_grpc_pb";
import { credentials } from "grpc";

const port = 3000;

export const client = new MessageServiceClient(
  `localhost:${port}`,
  credentials.createInsecure()
);

export const noop = () => {};