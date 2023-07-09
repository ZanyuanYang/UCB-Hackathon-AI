import express from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import cors from 'cors';

import NotFoundError from './errors/not-found-error.js';
import errorHandler from './middlewares/error-handler.js';
import ResponseMiddleware from './middlewares/ResponseMiddleware.js';
import LoggerMiddleware from './middlewares/LoggerMiddleware.js';

import { productRouter } from './routes/productRouter.js';

const app = express();
app.use(bodyParser.json({ limit: '25mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(LoggerMiddleware);
app.use(ResponseMiddleware);

app.use('/api', productRouter);

// when no page is found
app.get('/api/*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

// testVector();

export default app;
