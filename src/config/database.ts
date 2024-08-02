import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in the environment variables');
  process.exit(1);
}

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export const closeDB = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    console.log('Closed the database connection');
  } catch (error) {
    console.error('Error closing the database connection:', error);
  }
};

export const clearDB = async (): Promise<void> => {
  if (process.env.NODE_ENV === 'test') {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  }
};

export default mongoose;