import { connect } from 'mongoose';

export const API_VERSION = '/v1';
export const PORT = 8080;

export const DEFAULT_DB_NAME = 'message-service';
export const DEFAULT_DB_PORT = 27017;
export const DEFAULT_DB_HOST = 'localhost';
export const DEFAULT_DB_DIALECT = 'mongodb';

export const DB_CONN_STR = process.env.DB_CONN_STR || `${
    DEFAULT_DB_DIALECT}://${
    DEFAULT_DB_HOST}:${
    DEFAULT_DB_PORT}/${
    DEFAULT_DB_NAME}`;

export async function dbConfig() {
    console.log('Configuration databse...');
    return await connect(DB_CONN_STR, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    });
}
