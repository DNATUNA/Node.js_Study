import express, { Router } from 'express';
import { useExpressServer } from 'routing-controllers';
const app = express();

// 기존 방식
/*
const router = Router();

router.get('/hello-world', (req, res) => {
  res.json({
    data: 'hello-world',
  });
});*/

// new
useExpressServer(app, {
  controllers: [`${__dirname}/controllers/**`],
});

export { app };
