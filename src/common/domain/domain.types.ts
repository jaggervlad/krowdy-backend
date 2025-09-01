export interface EntityActionResult<TKey> {
  id: TKey;
  success: boolean;
  metadata?: any;
}

export interface RepositoryParams<TSelect, TWhere, TOrder, TNode, TResult, TInclude> {
  select?: TSelect;
  include?: TInclude;
  where?: TWhere;
  orderBy?: TOrder | TOrder[];
  mapper?: (item: TNode) => TResult;
}
