import { Prisma } from '@prisma/client';

export const isUniqueConstraintError = (e: Error) =>
  e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002';
