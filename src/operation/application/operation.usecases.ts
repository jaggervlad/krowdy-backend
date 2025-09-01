import { CreateOperationInput, Operation, OperationWithCostsDomain, UpdateOperationInput } from '../domain/operation.entity';
import { OperationRepository, OperationWithCosts } from '../domain/operation.repository';

export class OperationUseCases {
  constructor(private readonly operationRepository: OperationRepository) { }

  async getOperations(plantId?: string): Promise<OperationWithCostsDomain[]> {
    const result = await this.operationRepository.getMany<OperationWithCosts>({
      include: { OperationCost: true },
      where: plantId ? { plantId } : {}
    });
    const operations = result.getOrElse([]);

    return operations.map(o => {
      const operationCosts = o.OperationCost.map(oc => ({
        id: oc.id,
        cost: Number(oc.cost),
        createdAt: oc.createdAt,
        updatedAt: oc.updatedAt,
        operationId: oc.operationId,
        volumeRange: oc.volumeRange
      }));

      return {
        id: o.id,
        name: o.name,
        description: o.description,
        plantId: o.plantId,
        operationCosts,
        createdAt: o.createdAt,
        updatedAt: o.updatedAt,
      }
    })
  }

  async getOperation(id: string): Promise<OperationWithCostsDomain | null> {
    const result = await this.operationRepository.getOne<OperationWithCosts>(
      {
        where: { id },
        include: { OperationCost: true }
      });

    const op = result.getOrElse(null);
    if (!op) return null;

    const operationCosts = op.OperationCost.map(oc => ({
      id: oc.id,
      cost: Number(oc.cost),
      createdAt: oc.createdAt,
      updatedAt: oc.updatedAt,
      operationId: oc.operationId,
      volumeRange: oc.volumeRange
    }));

    return {
      id: op.id,
      name: op.name,
      description: op.description,
      plantId: op.plantId,
      operationCosts,
      createdAt: op.createdAt,
      updatedAt: op.updatedAt,
    };
  }

  async createOperation(input: CreateOperationInput): Promise<Operation | null> {
    const createResult = await this.operationRepository.createOperation(input);
    const created = createResult.getOrThrow('Error creating operation');
    return {
      id: created.id,
      name: created.name,
      description: created.description,
      plantId: created.plantId,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    };
  }

  async updateOperation(id: string, input: UpdateOperationInput): Promise<Operation | null> {
    const updateResult = await this.operationRepository.updateOperation(id, input);
    const updated = updateResult.getOrThrow('Error updating operation');
    return {
      id: updated.id,
      name: updated.name,
      description: updated.description,
      plantId: updated.plantId,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    };
  }

  async deleteOperation(id: string): Promise<boolean> {
    const result = await this.operationRepository.deleteOperation(id);
    return result.getOrElse(false);
  }
}
