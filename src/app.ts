import express from 'express';
import cors from 'cors';
import { HttpError } from './shared/presentation/errors/HttpError';
import { errorHandler } from './shared/presentation/errors/errorHandler';

export const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_request, response) => {
  return response.status(200).json({ status: 'ok' });
});

app.use(() => {
  throw new HttpError('Rota não encontrada.', 404);
});

app.use(errorHandler);
