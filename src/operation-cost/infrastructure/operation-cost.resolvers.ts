import { OperationCost } from '@prisma/client';
import { prismaService } from '../../config/prisma/prisma.service';
import { OperationCostUseCases } from '../application/operation-cost.usecases';
import { CreateOperationCostInput, UpdateOperationCostInput } from '../domain/operation-cost.entity';
import { OperationCostRepositoryImpl } from './operation-cost.repository-impl';

const operationCostUseCases = new OperationCostUseCases(new OperationCostRepositoryImpl(prismaService));

export const operationCostResolvers = {
  Query: {
    operationCosts: async (): Promise<OperationCost[]> => {
      return operationCostUseCases.getOperationCosts();
    },
    operationCost: async (_: any, { id }: { id: string }): Promise<OperationCost | null> => {
      return operationCostUseCases.getOperationCost(id);
    },
  },
  Mutation: {
    createOperationCost: async (_: any, { input }: { input: CreateOperationCostInput }): Promise<OperationCost | null> => {
      return operationCostUseCases.createOperationCost(input);
    },
    updateOperationCost: async (_: any, { id, input }: { id: string; input: UpdateOperationCostInput }): Promise<OperationCost | null> => {
      return operationCostUseCases.updateOperationCost(id, input);
    },
    deleteOperationCost: async (_: any, { id }: { id: string }): Promise<boolean> => {
      return operationCostUseCases.deleteOperationCost(id);
    },
  },
};
