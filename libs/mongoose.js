import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (e) {
    console.error(`🚨 ${e.message} coming from Mongoose ...`);
  }
};

export default connectMongo;
