import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pinoHttp } from 'pino-http';
import { env } from './utils/env.js';
import contactRoutes from './routes/contacts.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const PORT = Number(env('PORT', 3000));

export const setupServer = () => {
  const app = express();

  app.use(
    pinoHttp({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cors());

  app.use(contactRoutes);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
