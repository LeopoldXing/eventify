import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || {conn: null, promise: null};

const connectToDatabase = async () => {
  if(cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is invalid");
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "eventify",
      bufferCommands: false
    })
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export {connectToDatabase};
