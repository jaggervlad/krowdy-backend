import { Prisma, User } from "@prisma/client";
import { IBaseRepository } from "../../common/domain/base.repository";
import { Either } from "../../common/utils/types/either";

export interface UserRepository extends IBaseRepository<
  string,
  User,
  Prisma.UserSelect,
  Prisma.UserWhereInput,
  Prisma.UserOrderByWithAggregationInput
> {
  createUser(data: Partial<User>): Promise<Either<Error, User>>;
  updateUser(id: string, data: Partial<User>): Promise<Either<Error, User>>;
  deleteUser(id: string): Promise<Either<Error, boolean>>;
}