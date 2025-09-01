
import { User } from '@prisma/client';
import { prismaService } from '../../config/prisma/prisma.service';
import { UserUseCases } from '../application/user.usecases';
import { CreateUserInput, UpdateUserInput } from '../domain/user.entity';
import { UserRepositoryImpl } from './user.repository-impl';

const userUseCases = new UserUseCases(new UserRepositoryImpl(prismaService));

export const userResolvers = {
  Query: {
    users: async (): Promise<User[]> => {
      return userUseCases.getUsers();
    },
    user: async (_: any, { id }: { id: string }): Promise<User | null> => {
      return userUseCases.getUser(id);
    },
  },
  Mutation: {
    createUser: async (_: any, { input }: { input: CreateUserInput }): Promise<User | null> => {
      return userUseCases.createUser(input);
    },
    updateUser: async (_: any, { id, input }: { id: string; input: UpdateUserInput }): Promise<User | null> => {
      return userUseCases.updateUser(id, input);
    },
    deleteUser: async (_: any, { id }: { id: string }): Promise<boolean> => {
      return userUseCases.deleteUser(id);
    },
  },
};
