import mongoose from "mongoose";

export const mongoDB = async () => {
  try {
    let URI = process.env.MONGODB_URI;
    if (!URI) return;
    await mongoose.connect(URI);
  } catch (error) {
    console.log("error in connecting db" + error);
  }
};
