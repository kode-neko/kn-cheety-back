interface ICrud<T> {
  selectByid: (params: Record<string, unknown>) => Promise<T | null>;
  selectAll: () => Promise<T[]>;
  select: (params: Record<string, unknown>) => Promise<T[] | null>;
  insert: (ele: T) => Promise<T>;
  update: (ele: T, params: Record<string, unknown>) => Promise<boolean>;
  delete: (params: Record<string, unknown>) => Promise<boolean>;
}

export default ICrud;
