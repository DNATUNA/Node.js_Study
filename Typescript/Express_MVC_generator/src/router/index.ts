import express, { NextFunction, Request, Response } from 'express';
const IndexRouter: express.Router = express.Router();

IndexRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello World! Typescript + Express');
});

export = IndexRouter;
