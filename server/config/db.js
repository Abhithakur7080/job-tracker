import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/job-tracker`
    );
    console.log(
      `\n✅ MONGODB connected!! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("❌ MONGODB connection error", error);
    process.exit(1);
  }
};
export default connectDB;