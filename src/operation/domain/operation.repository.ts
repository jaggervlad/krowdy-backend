import { Operation, Prisma } from '@prisma/client';
import { IBaseRepository } from '../../common/domain/base.repository';
import { Either } from '../../common/utils/types/either';


export type OperationWithCosts = Prisma.OperationGetPayload<{ include: { OperationCost: true } }>;

export interface OperationRepository extends IBaseRepository<
  string,
  Operation,
  Prisma.OperationSelect,
  Prisma.OperationWhereInput,
  Prisma.OperationOrderByWithAggregationInput,
  Prisma.OperationInclude
> {
  createOperation(data: Partial<Operation>): Promise<Either<Error, Operation>>;
  updateOperation(id: string, data: Partial<Operation>): Promise<Either<Error, Operation>>;
  deleteOperation(id: string): Promise<Either<Error, boolean>>;
}
