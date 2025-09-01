import { BaseRepository } from '../../common/domain/base.repository';
import { CreateOperationInput, UpdateOperationInput } from '../domain/operation.entity';
import { Either } from '../../common/utils/types/either';
import { Operation, Prisma, PrismaClient } from '@prisma/client';
import { OperationRepository } from '../domain/operation.repository';

export class OperationRepositoryImpl extends BaseRepository<
  string,
  Operation,
  Prisma.OperationSelect,
  Prisma.OperationWhereInput,
  Prisma.OperationOrderByWithAggregationInput,
  Prisma.OperationInclude
> implements OperationRepository {
  constructor(prisma: PrismaClient) {
    super(prisma, {
      entity: 'operation',
      searchFields: ['name', 'description'],
      keyName: 'id',
    });
  }

  async createOperation(input: CreateOperationInput): Promise<Either<Error, Operation>> {
    const result = await this.create(input);
    if (result.isLeft()) return Either.left(result.fold(l => l instanceof Error ? l : new Error('Unknown error'), () => null as any));
    const id = result.fold(l => '', r => r.id);
    return this.getOne({ where: { id } }) as Promise<Either<Error, Operation>>;
  }

  async updateOperation(id: string, input: UpdateOperationInput): Promise<Either<Error, Operation>> {
    const result = await this.update(id, input);
    if (result.isLeft()) return Either.left(result.fold(l => l instanceof Error ? l : new Error('Unknown error'), () => null as any));
    return this.getOne({ where: { id } }) as Promise<Either<Error, Operation>>;
  }

  async deleteOperation(id: string): Promise<Either<Error, boolean>> {
    const result = await this.delete(id);
    if (result.isLeft()) return Either.left(result.fold(l => l instanceof Error ? l : new Error('Unknown error'), () => null as any));
    return Either.right(result.fold(l => false, r => r.success));
  }
}
