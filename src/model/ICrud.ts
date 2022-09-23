interface ICrud<T> {
  selectByid: (id: string) => T;
  selectAll: () => T;
  select: (params: Record<string, unknown>) => T;
  insert: (ele: T) => T;
  update: (ele: T) => T;
  delete: (id: string) => void;
}

export default ICrud;
