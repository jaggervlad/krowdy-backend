import { BaseRepository } from '../../common/domain/base.repository';
import { CreatePlantInput, UpdatePlantInput } from '../domain/plant.entity';
import { Either } from '../../common/utils/types/either';
import { Plant, Prisma, PrismaClient } from '@prisma/client';
import { PlantRepository } from '../domain/plant.repository';

export class PlantRepositoryImpl extends BaseRepository<
  string,
  Plant,
  Prisma.PlantSelect,
  Prisma.PlantWhereInput,
  Prisma.PlantOrderByWithAggregationInput,
  Prisma.PlantInclude
> implements PlantRepository {
  constructor(prisma: PrismaClient) {
    super(prisma, {
      entity: 'plant',
      searchFields: ['name', 'location'],
      keyName: 'id',
    });
  }

  async createPlant(input: CreatePlantInput): Promise<Either<Error, Plant>> {
    const result = await this.create(input);
    if (result.isLeft()) return Either.left(result.fold(l => l instanceof Error ? l : new Error('Unknown error'), () => null as any));
    const id = result.fold(l => '', r => r.id);
    return this.getOne({ where: { id } }) as Promise<Either<Error, Plant>>;
  }

  async updatePlant(id: string, input: UpdatePlantInput): Promise<Either<Error, Plant>> {
    const result = await this.update(id, input);
    if (result.isLeft()) return Either.left(result.fold(l => l instanceof Error ? l : new Error('Unknown error'), () => null as any));
    return this.getOne({ where: { id } }) as Promise<Either<Error, Plant>>;
  }

  async deletePlant(id: string): Promise<Either<Error, boolean>> {
    const result = await this.delete(id);
    if (result.isLeft()) return Either.left(result.fold(l => l instanceof Error ? l : new Error('Unknown error'), () => null as any));
    return Either.right(result.fold(l => false, r => r.success));
  }
}
