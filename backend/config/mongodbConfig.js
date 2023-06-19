import colors from 'colors';
import 'dotenv/config';
import mongoose from 'mongoose';

const mongodbConfig = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(colors.bold.cyan('Successfully connected to MongoDB.'));
  } catch (error) {
    console.log(colors.red(error));
  }
};

export default mongodbConfig;
