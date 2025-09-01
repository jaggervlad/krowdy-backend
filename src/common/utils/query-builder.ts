export function buildFilterClause(
  filter: any,
  search: string,
  searchFields: string[],
): any {
  const filterClause: any = { AND: [] };

  if (filter) {
    filterClause.AND.push(filter);
  }

  if (search && searchFields.length > 0) {
    filterClause.AND.push({
      OR: searchFields.map((field) => ({
        [field]: { contains: search, mode: 'insensitive' },
      })),
    });
  }

  return filterClause.AND.length > 0 ? filterClause : {};
}

export function buildOrderClause(orderBy: any): any {
  if (!orderBy) return undefined;

  return Object.entries(orderBy).reduce((acc: any, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
}
