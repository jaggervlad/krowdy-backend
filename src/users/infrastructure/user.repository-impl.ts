
import { BaseRepository } from '../../common/domain/base.repository';
import { CreateUserInput, UpdateUserInput } from '../domain/user.entity';
import { Either } from '../../common/utils/types/either';
import { Prisma, User, PrismaClient } from '@prisma/client';
import { UserRepository } from '../domain/user.repository';

export class UserRepositoryImpl extends BaseRepository<
  string,
  User,
  Prisma.UserSelect,
  Prisma.UserWhereInput,
  Prisma.UserOrderByWithAggregationInput
> implements UserRepository {
  constructor(prisma: PrismaClient) {
    super(prisma, {
      entity: 'user',
      searchFields: ['email', 'name'],
      keyName: 'id',
    });
  }

  async createUser(input: CreateUserInput): Promise<Either<Error, User>> {
    const result = await this.create(input);
    if (result.isLeft()) return Either.left(result.fold(l => l instanceof Error ? l : new Error('Unknown error'), () => null as any));
    const id = result.fold(l => '', r => r.id);
    return this.getOne({ where: { id } }) as Promise<Either<Error, User>>;
  }

  async updateUser(id: string, input: UpdateUserInput): Promise<Either<Error, User>> {
    const result = await this.update(id, input);
    if (result.isLeft()) return Either.left(result.fold(l => l instanceof Error ? l : new Error('Unknown error'), () => null as any));
    return this.getOne({ where: { id } }) as Promise<Either<Error, User>>;
  }

  async deleteUser(id: string): Promise<Either<Error, boolean>> {
    const result = await this.delete(id);
    if (result.isLeft()) return Either.left(result.fold(l => l instanceof Error ? l : new Error('Unknown error'), () => null as any));
    return Either.right(result.fold(l => false, r => r.success));
  }
}
