interface ICrud<T> {
  selectByid: (params: Record<string, unknown>) => Promise<T | null>;
  selectAll: () => Promise<T[]>;
  select: (params: Record<string, unknown>) => Promise<T[]>;
  insert: (ele: T) => Promise<T>;
  update: (ele: Partial<T>, params: Record<string, unknown>) => Promise<number>;
  delete: (params: Record<string, unknown>) => Promise<number>;
}

export default ICrud;
