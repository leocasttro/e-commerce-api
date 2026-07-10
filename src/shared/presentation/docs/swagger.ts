import swaggerUi from 'swagger-ui-express';
import { openApiDocument } from './openApiDocument';

export const swaggerServe = swaggerUi.serve;
export const swaggerSetup = swaggerUi.setup(openApiDocument);
