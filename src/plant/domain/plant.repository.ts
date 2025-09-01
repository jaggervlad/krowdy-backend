import { Plant, Prisma } from '@prisma/client';
import { IBaseRepository } from '../../common/domain/base.repository';
import { Either } from '../../common/utils/types/either';

export interface PlantRepository extends IBaseRepository<
  string,
  Plant,
  Prisma.PlantSelect,
  Prisma.PlantWhereInput,
  Prisma.PlantOrderByWithAggregationInput,
  Prisma.PlantInclude
> {
  createPlant(data: Partial<Plant>): Promise<Either<Error, Plant>>;
  updatePlant(id: string, data: Partial<Plant>): Promise<Either<Error, Plant>>;
  deletePlant(id: string): Promise<Either<Error, boolean>>;
}
