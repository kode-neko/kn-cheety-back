interface ICrud<T> {
  selectByid: (id: string) => Promise<T | null>;
  selectAll: () => Promise<T[]>;
  select: (params: Record<string, unknown>) => Promise<T[] | null>;
  insert: (ele: T) => Promise<T>;
  update: (ele: T) => Promise<boolean>;
  delete: (id: string) => Promise<boolean>;
}

export default ICrud;
