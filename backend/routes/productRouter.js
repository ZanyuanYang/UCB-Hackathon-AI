import express from 'express';
import {
  getOne,
  getAll,
  create,
  update,
  remove,
  pineconeQuery,
  pineconeInsert,
  mongodbInsert,
} from '../controllers/productController.js';

const router = express.Router();

router.route('/product').get(getAll).post(create);
router.route('/product/:_id').get(getOne).put(update).delete(remove);
router.route('/product/pinecone').post(pineconeQuery);
router.route('/product/pinecone/insert').post(pineconeInsert);
router.route('/product/mongodb/insert').post(mongodbInsert);

export { router as productRouter };
