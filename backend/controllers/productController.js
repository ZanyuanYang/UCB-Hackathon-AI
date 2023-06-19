import Product from '../models/product.js';
import { StatusCodes } from 'http-status-codes';
import { PineconeClient } from '@pinecone-database/pinecone';
import { Document } from 'langchain/document';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { VectorDBQAChain } from 'langchain/chains';
import { OpenAI } from 'langchain/llms/openai';
import fs from 'fs';
import csv from 'csv-parser';
import { BufferMemory } from 'langchain/memory';
import { ConversationChain } from 'langchain/chains';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
} from 'langchain/prompts';

// get one by id
const getOne = async (req, res) => {
  const product = await Product.findOne({
    _id: req.params._id,
  });
  res.successResponse(StatusCodes.OK, {
    data: product,
  });
};

//get all
const getAll = async (req, res) => {
  const products = await Product.find({ show: true });
  res.successResponse(StatusCodes.OK, {
    data: products,
  });
};

const create = async (req, res) => {
  // create product
  const product = new Product(req.body);
  await product.save();
  res.successResponse(StatusCodes.CREATED, {
    data: product,
  });
};

const mongodbInsert = async (req, res) => {
  const results = [];

  fs.createReadStream('./nike_products.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      results.forEach(async (row) => {
        const product = new Product({
          name: row['Product Name'],
          productLink: row['Product Link'],
          imageLink: row['Image Link'],
          productPrice: row['Product Price'],
          productDescription: row['Product Description'],
        });
        await product.save();
      });
    });
  res.successResponse(StatusCodes.OK, {
    data: 'success',
  });
};

const update = async (req, res) => {
  // update slider and update the current time
  const product = await Product.findByIdAndUpdate(req.params._id, req.body);
  await product.save();
  res.successResponse(StatusCodes.OK, {
    data: product,
  });
};

const remove = async (req, res) => {
  // remove slider
  const product = await Product.findByIdAndRemove(req.params._id);
  res.successResponse(StatusCodes.OK, {
    data: product,
  });
};

const parseCSV = () => {
  return new Promise((resolve, reject) => {
    const results = [];
    const docs = [];

    fs.createReadStream('./nike_products.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        results.forEach((row) => {
          const document = new Document({
            metadata: {
              name: row['Product Name'],
              productLink: row['Product Link'],
              imageLink: row['Image Link'],
              productPrice: row['Product Price'],
              productDescription: row['Product Description'],
            },
            pageContent: row['Product Description'],
          });
          docs.push(document);
        });
        resolve(docs);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
};

const pineconeInsert = async (req, res) => {
  const client = new PineconeClient();
  await client.init({
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_ENVIRONMENT,
  });
  const pineconeIndex = client.Index(process.env.PINECONE_INDEX);

  parseCSV()
    .then(async (docs) => {
      console.log(docs);
      const response = await PineconeStore.fromDocuments(
        docs,
        new OpenAIEmbeddings(),
        {
          pineconeIndex,
        }
      );
      res.successResponse(StatusCodes.OK, {
        data: response,
      });
    })
    .catch((err) => {
      console.error(err);
      res.successResponse(StatusCodes.OK, {
        data: 'fail',
      });
    });
};

let chain;

const initModel = async (input) => {
  if (!chain) {
    const chat = new ChatOpenAI({ temperature: 0 });

    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
      SystemMessagePromptTemplate.fromTemplate(
        'You are a Nike sales representative. \n' +
          "Given the pre-determined recommended shoe data, present it to the customer, and explain why the shoe fits the customer's query around 5 sentences."
      ),
      new MessagesPlaceholder('history'),
      HumanMessagePromptTemplate.fromTemplate('{input}'),
    ]);

    chain = new ConversationChain({
      memory: new BufferMemory({ returnMessages: true, memoryKey: 'history' }),
      prompt: chatPrompt,
      llm: chat,
    });
  }

  const response = await chain.call({
    input: input,
  });
  console.log('response', response);

  return response;
};

const pineconeQuery = async (req, res) => {
  const client = new PineconeClient();
  await client.init({
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_ENVIRONMENT,
  });

  const pineconeIndex = client.Index(process.env.PINECONE_INDEX);
  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings(),
    { pineconeIndex }
  );

  /* Use as part of a chain (currently no metadata filters) */
  const model = new OpenAI();
  const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
    k: 3,
    returnSourceDocuments: true,
  });
  const response = await chain.call({
    query: req.body.input,
  });
  const text = await initModel(response.text);
  response.text = text.response;

  res.successResponse(StatusCodes.OK, {
    data: response,
  });
  // res.successResponse(StatusCodes.OK, {
  //   data: 'ssucees',
  // });
};

export {
  getOne,
  getAll,
  create,
  update,
  remove,
  pineconeInsert,
  mongodbInsert,
  pineconeQuery,
};
