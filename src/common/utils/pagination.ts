export interface PaginationOffsetArgs {
  offset: number;
  pageSize: number;
}

export interface PaginationOffsetResult<T> {
  items: T[];
  total: number;
  hasMore: boolean;
}

export async function getRecordsPaginatedWithOffset<T, R = T>(
  getItems: (args: { skip: number; take: number }) => Promise<T[]>,
  getCount: () => Promise<number>,
  { offset, pageSize }: PaginationOffsetArgs,
  mapper?: (item: T) => R,
): Promise<PaginationOffsetResult<R>> {
  const [items, total] = await Promise.all([
    getItems({ skip: offset, take: pageSize }),
    getCount(),
  ]);

  return {
    items: mapper ? items.map(mapper) : (items as any),
    total,
    hasMore: offset + pageSize < total,
  };
}
