import express from 'express';
import cors from 'cors';
import { pinoHttp } from 'pino-http';

const PORT = 8080;

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

  app.get('/', (req, res) => {
    console.log('request 1');
    res.send('first request');
  });

  app.get('*', (req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
