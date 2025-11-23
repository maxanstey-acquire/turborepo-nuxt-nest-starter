import { PRISMA_CLIENT } from './token.js';
import { prisma } from '../client.js';

export const PrismaClientProvider = {
  provide: PRISMA_CLIENT,
  useValue: prisma,
};
