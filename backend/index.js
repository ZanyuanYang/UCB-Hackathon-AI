import app from './app.js';
import 'dotenv/config';
import mongodbConfig from './config/mongodbConfig.js';
import pineconeConfig from './config/pineconeConfig.js';

const port = process.env.PORT || 8080;

const start = async () => {
  try {
    await mongodbConfig();
    await pineconeConfig();
  } catch (error) {
    console.log(error);
  }
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
};

start();
