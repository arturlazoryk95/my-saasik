import mongoose from "mongoose";
import User from "@/models/User";
import Board from "@/models/Board";

// const connectMongo = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//   } catch (e) {
//     console.error(`🚨 ${e.message} coming from Mongoose ...`);
//   }
// };

// export default connectMongo;

if (!process.env.MONGO_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGO_URI"');
}

const MONGODB_URI = process.env.MONGO_URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectMongo() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectMongo;
