import { EntityActionResult, RepositoryParams } from './domain.types';
import { PaginationOffsetArgs, PaginationOffsetResult, getRecordsPaginatedWithOffset } from '../utils/pagination';
import { Either } from '../utils/types/either';
import { buildFilterClause, buildOrderClause } from '../utils/query-builder';
import { Prisma, PrismaClient } from '@prisma/client';
import { nullish } from '../utils/utilities/nullish';

export interface IBaseRepository<
  TKey = number,
  TNode = any,
  TSelect = any,
  TWhere = any,
  TOrder = any,
  TInclude = any
> {
  count(where: TWhere): Promise<Either<Error, number>>;
  getOne<TResult2 = TNode>(params: RepositoryParams<TSelect, TWhere, TOrder, TNode, TResult2, TInclude>): Promise<Either<Error, TResult2 | null>>;
  getMany<TResult2 = TNode>(params?: RepositoryParams<TSelect, TWhere, TOrder, TNode, TResult2, TInclude>): Promise<Either<Error, TResult2[]>>;
  getPaginated<TResult2 = TNode, TSort2 = TOrder>(args: {
    params: PaginationOffsetArgs;
    orderBy: TSort2;
    search: string;
    filter: any;
    select?: TSelect;
    mapper?: (item: TNode) => TResult2;
  }): Promise<Either<Error, PaginationOffsetResult<TResult2> | null>>;
  create<TPayload = any>(payload: TPayload, select?: TSelect): Promise<Either<Error, EntityActionResult<TKey>>>;
  update<TPayload = any>(id: TKey, payload: TPayload): Promise<Either<Error, EntityActionResult<TKey>>>;
  delete(id: TKey): Promise<Either<Error, EntityActionResult<TKey>>>;
}

export abstract class BaseRepository<
  TKey = number,
  TNode = any,
  TSelect = any,
  TWhere = any,
  TOrder = any,
  TInclude = any
> {
  constructor(
    protected readonly prismaService: PrismaClient,
    protected readonly settings: {
      entity: keyof Omit<PrismaClient, `$${string}`>;
      searchFields: (keyof TNode)[];
      keyName?: string;
    } = {
        entity: null as any,
        searchFields: [],
        keyName: 'id',
      },
  ) {
    nullish(this.settings.keyName) && (this.settings.keyName = 'id');
  }

  async count(where: TWhere): Promise<Either<Error, number>> {
    try {
      const keyName = this.settings.keyName as string;
      const result = await (
        this.prismaService[this.settings.entity] as any
      ).count({
        where: {
          ...where,
        },
        select: keyName ? { [keyName]: true } : undefined,
      });
      return Either.right(result);
    } catch (error) {
      return Either.left(error as Error);
    }
  }

  async getOne<TResult = TNode>({ mapper, where, include, ...restParams }: RepositoryParams<TSelect, TWhere, TOrder, TNode, TResult, TInclude>): Promise<Either<Error, TResult | null>> {
    try {
      const result = await (
        this.prismaService[this.settings.entity] as any
      ).findFirst({
        where: { ...(where || {}) },
        ...(include && { include }),
        ...restParams,
      });
      return Either.right(mapper ? mapper(result) : result);
    } catch (error) {
      return Either.left(error as Error);
    }
  }

  async getMany<TResult = TNode>({ mapper, where, include, ...restParams }: RepositoryParams<TSelect, TWhere, TOrder, TNode, TResult, TInclude> = {} as any): Promise<Either<Error, TResult[]>> {
    try {
      const result = await (
        this.prismaService[this.settings.entity] as any
      ).findMany({
        where: { ...(where || {}) },
        ...(include && { include }),
        ...restParams,
      });
      return Either.right(mapper ? result.map(mapper) : result);
    } catch (error) {
      return Either.left(error as Error);
    }
  }

  async getPaginated<TResult = TNode, TSort = TOrder>({
    params: { offset, pageSize },
    orderBy,
    search,
    filter,
    select,
    include,
    mapper,
  }: {
    params: PaginationOffsetArgs;
    orderBy: TSort;
    search: string;
    filter: any;
    select?: TSelect;
    include?: TInclude;
    mapper?: (item: TNode) => TResult;
  }): Promise<Either<Error, PaginationOffsetResult<TResult> | null>> {
    try {
      const queryExpression = buildFilterClause(
        filter,
        search,
        this.settings.searchFields as string[],
      );
      const result = await getRecordsPaginatedWithOffset<TNode, TResult>(
        (args) =>
          (this.prismaService[this.settings.entity] as any).findMany({
            where: queryExpression,
            orderBy: buildOrderClause(orderBy as any),
            ...(select && { select }),
            ...(include && { include }),
            ...args,
          }),
        () =>
          (this.prismaService[this.settings.entity] as any).count({
            where: queryExpression,
          }),
        { offset, pageSize },
        mapper,
      );
      return Either.right(result);
    } catch (error) {
      return Either.left(error as Error);
    }
  }

  async create<TPayload = any>(payload: TPayload, select?: TSelect): Promise<Either<Error, EntityActionResult<TKey>>> {
    try {
      const keyName = this.settings.keyName as string;
      const data: any = { ...payload };
      const result = await (
        this.prismaService[this.settings.entity] as any
      ).create({
        data,
        ...(select && { select }),
      });
      const newId = keyName ? result[keyName] : undefined;
      return Either.right({
        id: newId,
        success: !!newId,
        metadata: result,
      });
    } catch (error) {
      return Either.left(error as Error);
    }
  }

  async update<TPayload = any>(id: TKey, payload: TPayload): Promise<Either<Error, EntityActionResult<TKey>>> {
    try {
      const keyName = this.settings.keyName as string;
      const data: any = { ...payload };
      if (keyName) delete data[keyName];
      const result: Prisma.BatchPayload = await (
        this.prismaService[this.settings.entity] as any
      ).updateMany({
        where: keyName ? { [keyName]: id } : {},
        data: data,
      });
      return Either.right({
        id: id as any,
        success: result.count > 0,
        metadata: result,
      });
    } catch (error) {
      return Either.left(error as Error);
    }
  }

  async delete(id: TKey): Promise<Either<Error, EntityActionResult<TKey>>> {
    try {
      const keyName = this.settings.keyName as string;
      const result: Prisma.BatchPayload = await (
        this.prismaService[this.settings.entity] as any
      ).deleteMany({
        where: keyName ? { [keyName]: id } : {},
      });
      return Either.right({
        id: id as any,
        success: result.count > 0,
      });
    } catch (error) {
      return Either.left(error as Error);
    }
  }
}
