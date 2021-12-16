import 'reflect-metadata';
import 'dotenv/config';

import 'express-async-errors';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import { errors } from 'celebrate';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';

import rateLimiter from './middlewares/rateLimiter';
import routes from './routes';
import '@shared/infra/typeorm';
import '@shared/container/index';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(rateLimiter);
app.use(routes);

app.use(errors());

app.use((error: Error, req: Request, resp: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return resp.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  console.error(error);

  return resp.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('🚀 Server Started on port 3333!');
});
