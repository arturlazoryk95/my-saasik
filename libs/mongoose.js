// import mongoose from "mongoose";
// import User from "@/models/User";
// import Board from "@/models/Board";

// const connectMongo = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//   } catch (e) {
//     console.error(`🚨 ${e.message} coming from Mongoose ...`);
//   }
// };

// export default connectMongo;

// if (!process.env.MONGO_URI) {
//   throw new Error('Invalid/Missing environment variable: "MONGO_URI"');
// }

// const MONGODB_URI = process.env.MONGO_URI;

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function connectMongo() {
//   if (cached.conn) {
//     console.log("Reusing existing connection.");
//     return cached.conn;
//   }

//   console.log("Creating new connection ...");

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     };

//     cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
//       return mongoose;
//     });
//   }

//   try {
//     cached.conn = await cached.promise;
//   } catch (e) {
//     cached.promise = null;
//     throw e;
//   }

//   return cached.conn;
// }

// export default connectMongo;

import mongoose from "mongoose";

if (!process.env.MONGO_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGO_URI"');
}

const MONGODB_URI = process.env.MONGO_URI;

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}
const cached = global.mongoose;

async function connectMongo() {
  console.log(
    "Current mongoose connection state:",
    mongoose.connection.readyState
  );

  if (cached.conn) {
    console.log("✅ Using existing connection");
    return cached.conn;
  }

  console.log("🔄 Creating new connection...");

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("📡 New connection established");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    console.error(`❌ MongoDB connection failed: ${e.message}`);
    console.error("🔍 Full error:", e);
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Add these connection event listeners
if (!global.mongooseListenersAttached) {
  mongoose.connection.on("connected", () =>
    console.log("🟢 MongoDB connected")
  );
  mongoose.connection.on("disconnected", () =>
    console.log("🔴 MongoDB disconnected")
  );
  mongoose.connection.on("error", (err) =>
    console.log("🚨 MongoDB error:", err)
  );
  global.mongooseListenersAttached = true;
}

export default connectMongo;
