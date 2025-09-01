export const nullish = <TType>(value: TType | null | undefined): boolean =>
  typeof value === 'undefined' || value === null;
