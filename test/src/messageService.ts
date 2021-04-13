import { expect } from 'chai';
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';
import * as supertest from 'supertest';
import { API_VERSION } from '../../config';
import { server } from '../../src';
import { Message, MessageType } from '../../src/orm';

// tslint:disable-next-line: no-var-requires
const messages: any[] = require('./message.json');

describe('MessageService', () => {
    const mongoServer = new MongoMemoryServer();
    let connection: mongoose.Mongoose | null = null;

    const app = supertest(server);
    const baseUrl = `${API_VERSION}/messages`;

    let messageCollection: MessageType[] = [];
    const invalidId = new mongoose.Types.ObjectId();

    before(async () => {
        const url = await mongoServer.getConnectionString();
        connection = await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        connection.connection.useDb(await mongoServer.getDbName());
    });

    after(async () => {
        if (connection) {
            await connection.disconnect();
            mongoServer.stop();
        }
    });

    beforeEach(async () => {
        messageCollection = [];
        for (const message of messages) {
            const m = await Message.create(message);
            messageCollection.push(m);
        }
    });

    afterEach(async () => {
        if (connection) {
            await connection.connection.dropCollection('messages');
        }
    });

    it('List messages. Should return 3 element in array.', (done) => {
        app.get(baseUrl)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                const body = res.body;

                expect((body || []).length).to.be
                    .equal(3, 'Array contains wrong number of elements.');

                done();
            });
    });

    it('List messages with search. Should return 1 element in array.', (done) => {
        app.get(baseUrl + '?message=2')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, { body }) => {
                if (err) {
                    return done(err);
                }

                expect((body || []).length).to.be
                    .equal(2, 'Array contains wrong number of elements.');

                done();
            });
    });

    it('List messages with pagination options. Should return 1 element in array.',
        (done) => {
            app.get(baseUrl + '?pageSize=1&pageToken=1')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    const body = res.body;
                    expect((body || []).length).to.be
                        .equal(1, 'Array contains wrong number of elements.');

                    done();
                });
        });

    it('Create message. Should return success response with message entity.',
        (done) => {
            const msg = {
                category: 'test_category',
                origin: 'test_origin',
                message: 'some message',
            };

            app.post(baseUrl).send(msg)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201)
                .end((err, { body }) => {
                    if (err) {
                        return done(err);
                    }

                    expect(body).to.include.all.keys(
                        '_id', 'category', 'origin', 'message'
                    );

                    done();
                });
        });

});
