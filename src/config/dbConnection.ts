import mongoose from "mongoose";

mongoose.Promise = Promise; // Set mongoose to use ES6 Promises.

const dbURI = "mongodb://127.0.0.1:27017/myDb";
const reconnectTimeout = 3000; // ms

/**
 * Connect to mongoDB using Mongoose
 */
function connect() {
  mongoose
    .connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true // Removes the DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead
    })
    .catch(error => {
      console.log(`MongoDB connection error: ${error}`);
    });
}

mongoose.connection.on("connecting", () => {
  console.log("Connecting to MongoDB...");
});

mongoose.connection.on("error", error => {
  mongoose.disconnect();
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB!");
});

mongoose.connection.once("open", () => {
  console.log("MongoDB connection opened!");
});

mongoose.connection.on("reconnected", () => {
  console.log("MongoDB reconnected!");
});

mongoose.connection.on("disconnected", () => {
  console.log(
    `MongoDB disconnected! Reconnecting in ${reconnectTimeout / 1000}s...`
  );
  setTimeout(async () => connect(), reconnectTimeout);
});

connect();

export default mongoose;
