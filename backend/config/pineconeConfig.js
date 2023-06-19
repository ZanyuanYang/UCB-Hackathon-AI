import colors from 'colors';
import { PineconeClient } from '@pinecone-database/pinecone';
const pinecone = new PineconeClient();

const pineconeConfig = async () => {
  try {
    await pinecone.init({
      environment: process.env.PINECONE_ENVIRONMENT,
      apiKey: process.env.PINECONE_API_KEY,
    });

    console.log(colors.bold.cyan('Successfully connected to Pinecone.'));
  } catch (error) {
    console.log(colors.red(error));
  }
};

export default pineconeConfig;
