import bodyParser from 'body-parser';
import express from 'express';
// Import Router
import IndexRouter from './router/index';

class App {
  public app: express.Application;
  constructor() {
    this.app = express();
  }
}
const app = new App().app;

// Setting Router
app.use('/', IndexRouter);

// Express configurations
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

export = app;
