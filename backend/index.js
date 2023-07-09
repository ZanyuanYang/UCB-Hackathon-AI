import app from './app.js';
import 'dotenv/config';
import mongodbConfig from './config/mongodbConfig.js';
import pineconeConfig from './config/pineconeConfig.js';

const port = process.env.PORT || 8080;

const start = async () => {
  try {
    await mongodbConfig();
    await pineconeConfig();
    // const index = pinecone.Index('example-index');
    // const upsertRequest = {
    //   vectors: [
    //     {
    //       id: 'vec3',
    //       values: Array(1024).fill(0.4),
    //       metadata: {
    //         genre: 'drama',
    //       },
    //     },
    //     {
    //       id: 'vec4',
    //       values: Array(1024).fill(0.5),
    //       metadata: {
    //         genre: 'action',
    //       },
    //     },
    //   ],
    //   namespace: 'example-namespace',
    // };
    // const upsertResponse = await index.upsert({ upsertRequest });

    // const index = pinecone.Index('example-index');
    // const queryRequest = {
    //   vector: Array(1024).fill(0.1),
    //   topK: 1,
    //   includeValues: true,
    //   includeMetadata: true,
    //   filter: {
    //     genre: { $in: ['pork'] },
    //   },
    //   namespace: 'example-namespace',
    // };
    // const queryResponse = await index.query({ queryRequest });
    // console.log('queryResponse', queryResponse);
  } catch (error) {
    console.log(error);
  }
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
};

start();
