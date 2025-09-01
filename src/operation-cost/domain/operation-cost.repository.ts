import { IBaseRepository } from '../../common/domain/base.repository';
import { Either } from '../../common/utils/types/either';
import { OperationCost, Prisma } from '@prisma/client';

export interface OperationCostRepository extends IBaseRepository<
  string,
  OperationCost,
  Prisma.OperationCostSelect,
  Prisma.OperationCostWhereInput,
  Prisma.OperationCostOrderByWithAggregationInput
> {
  createOperationCost(data: Partial<OperationCost>): Promise<Either<Error, OperationCost>>;
  updateOperationCost(id: string, data: Partial<OperationCost>): Promise<Either<Error, OperationCost>>;
  deleteOperationCost(id: string): Promise<Either<Error, boolean>>;
}
