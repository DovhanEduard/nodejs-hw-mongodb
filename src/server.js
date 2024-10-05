import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pinoHttp } from 'pino-http';
import { env } from './utils/env.js';
import { Contact } from './models/contacts.js';
import { getAllContacts, getContactById } from './services/contacts.js';

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

  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await getAllContacts();

      res.status(200).json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
      console.log(error);

      res.status(500).send('Internal Server Error');
    }
  });

  app.get('/contacts/:contactId', async (req, res) => {
    try {
      const { contactId } = req.params;

      const contact = await getContactById(contactId);

      if (contact === null) {
        return res.status(404).send('Contact no found');
      }

      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    } catch (error) {
      console.log(error);

      res.status(500).send('Internal Server Error');
    }
  });

  app.get('*', (req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
