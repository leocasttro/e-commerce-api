import { ErrorRequestHandler } from 'express';
import { mapErrorToHttp } from './errorMapper';

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  const httpError = mapErrorToHttp(error);

  if (httpError.statusCode === 500) {
    console.error(error);
  }

  return response.status(httpError.statusCode).json({
    error: {
      message: httpError.message,
    },
  });
};
