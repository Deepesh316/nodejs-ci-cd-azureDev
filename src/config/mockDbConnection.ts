import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const opts = { useNewUrlParser: true, useUnifiedTopology: true };
export class MockDbConnection {
  private mongoServer;
  constructor() {
    this.mongoServer = new MongoMemoryServer();
  }

  /**
   * Connect to in-memory database
   */
  public async start(): Promise<void> {
    const mongoUri = await this.mongoServer.getUri();
    await mongoose.connect(mongoUri, opts);
  }

  /**
   * Disconnect stop mongoServer
   */
  public async stop(): Promise<void> {
    await mongoose.disconnect();
    await this.mongoServer.stop();
  }

  /**
   * Remove data from db collection
   */
  public async cleanUp(): Promise<void> {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      if (collections.hasOwnProperty(key)) {
        const collection = collections[key];
        await collection.deleteMany();
      }
    }
  }
}
