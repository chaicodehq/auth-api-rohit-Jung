import mongoose from "mongoose";

/**
 * TODO: Connect to MongoDB
 *
 * 1. Check if uri is provided (throw error if not: "MongoDB URI is required")
 * 2. Connect using mongoose.connect(uri)
 * 3. Return mongoose.connection
 */
export async function connectDB(uri) {
  // Your code here
  try {
    if (!uri || !uri.trim()) throw new Error("MongoDB URI is required");
    const connection = await mongoose.connect(uri);
    return connection;
  } catch (error) {
    // 1 exit code means error ?
    throw new Error(error);
  }
}
