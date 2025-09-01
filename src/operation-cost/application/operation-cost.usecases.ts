import { OperationCost } from '@prisma/client';
import { CreateOperationCostInput, UpdateOperationCostInput } from '../domain/operation-cost.entity';
import { OperationCostRepository } from '../domain/operation-cost.repository';

export class OperationCostUseCases {
  constructor(private readonly operationCostRepository: OperationCostRepository) { }

  async getOperationCosts(): Promise<OperationCost[]> {
    const result = await this.operationCostRepository.getMany();
    return result.getOrElse([]);
  }

  async getOperationCost(id: string): Promise<OperationCost | null> {
    const result = await this.operationCostRepository.getOne({ where: { id } });
    return result.getOrElse(null);
  }

  async createOperationCost(input: CreateOperationCostInput): Promise<OperationCost | null> {
    const result = await this.operationCostRepository.createOperationCost(input);
    return result.getOrThrow('Error creating operation cost');
  }

  async updateOperationCost(id: string, input: UpdateOperationCostInput): Promise<OperationCost | null> {
    const result = await this.operationCostRepository.updateOperationCost(id, input);
    return result.getOrThrow('Error updating operation cost');
  }

  async deleteOperationCost(id: string): Promise<boolean> {
    const result = await this.operationCostRepository.deleteOperationCost(id);
    return result.getOrElse(false);
  }
}
