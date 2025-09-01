import { prismaService } from '../../config/prisma/prisma.service';
import { OperationUseCases } from '../application/operation.usecases';
import { CreateOperationInput, Operation, UpdateOperationInput } from '../domain/operation.entity';
import { OperationRepositoryImpl } from './operation.repository-impl';

const operationUseCases = new OperationUseCases(new OperationRepositoryImpl(prismaService));

export const operationResolvers = {
  Query: {
    operations: async (_: any, { plantId }: { plantId?: string }): Promise<Operation[]> => {
      return operationUseCases.getOperations(plantId);
    },
    operation: async (_: any, { id }: { id: string }): Promise<Operation | null> => {
      return operationUseCases.getOperation(id);
    },
  },
  Mutation: {
    createOperation: async (_: any, { input }: { input: CreateOperationInput }): Promise<Operation | null> => {
      return operationUseCases.createOperation(input);
    },
    updateOperation: async (_: any, { id, input }: { id: string; input: UpdateOperationInput }): Promise<Operation | null> => {
      return operationUseCases.updateOperation(id, input);
    },
    deleteOperation: async (_: any, { id }: { id: string }): Promise<boolean> => {
      return operationUseCases.deleteOperation(id);
    },
  },
};
