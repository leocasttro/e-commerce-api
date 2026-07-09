import { NextFunction, Request, Response } from 'express';

type AsyncRouteHandler = (
  request: Request,
  response: Response,
  next: NextFunction,
) => Promise<unknown>;

export const asyncHandler =
  (handler: AsyncRouteHandler) => (request: Request, response: Response, next: NextFunction) => {
    Promise.resolve(handler(request, response, next)).catch(next);
  };
