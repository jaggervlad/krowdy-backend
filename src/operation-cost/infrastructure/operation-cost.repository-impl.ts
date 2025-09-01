import { BaseRepository } from '../../common/domain/base.repository';
import { CreateOperationCostInput, UpdateOperationCostInput } from '../domain/operation-cost.entity';
import { Either } from '../../common/utils/types/either';
import { OperationCost, Prisma, PrismaClient } from '@prisma/client';
import { OperationCostRepository } from '../domain/operation-cost.repository';

export class OperationCostRepositoryImpl extends BaseRepository<
  string,
  OperationCost,
  Prisma.OperationCostSelect,
  Prisma.OperationCostWhereInput,
  Prisma.OperationCostOrderByWithAggregationInput
> implements OperationCostRepository {
  constructor(prisma: PrismaClient) {
    super(prisma, {
      entity: 'operationCost',
      searchFields: ['volumeRange', 'operationId'],
      keyName: 'id',
    });
  }

  async createOperationCost(input: CreateOperationCostInput): Promise<Either<Error, OperationCost>> {
    const result = await this.create(input);
    if (result.isLeft()) return Either.left(result.fold(l => l instanceof Error ? l : new Error('Unknown error'), () => null as any));
    const id = result.fold(l => '', r => r.id);
    return this.getOne({ where: { id } }) as Promise<Either<Error, OperationCost>>;
  }

  async updateOperationCost(id: string, input: UpdateOperationCostInput): Promise<Either<Error, OperationCost>> {
    const result = await this.update(id, input);
    if (result.isLeft()) return Either.left(result.fold(l => l instanceof Error ? l : new Error('Unknown error'), () => null as any));
    return this.getOne({ where: { id } }) as Promise<Either<Error, OperationCost>>;
  }

  async deleteOperationCost(id: string): Promise<Either<Error, boolean>> {
    const result = await this.delete(id);
    if (result.isLeft()) return Either.left(result.fold(l => l instanceof Error ? l : new Error('Unknown error'), () => null as any));
    return Either.right(result.fold(l => false, r => r.success));
  }
}
