import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import { pinoHttp } from 'pino-http';
import { env } from './utils/env.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import routes from './routes/index.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';

dotenv.config();

const PORT = Number(env('PORT', 3000));

export const setupServer = () => {
  const app = express();

  // app.use(
  //   pinoHttp({
  //     transport: {
  //       target: 'pino-pretty',
  //     },
  //   }),
  // );
  app.use(cors());
  app.use(cookieParser());
  app.use('/uploads', express.static(UPLOAD_DIR));

  app.use(routes);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
