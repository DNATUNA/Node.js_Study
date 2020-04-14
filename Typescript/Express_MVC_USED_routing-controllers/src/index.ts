import { app } from './app';
import dotenv from 'dotenv';
import 'reflect-metadata';

dotenv.config();

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || 'localhost';

const startApplication = async () => {
  // await connectDatabase();

  app.listen(PORT, HOST, () => {
    console.log(`server is running on localhost:${PORT}`);
  });
};

startApplication();
