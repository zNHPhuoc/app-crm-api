export interface BaseRepositoryInterface<T> {
  create(dto: T | any): Promise<T>;

  findOneById(id: string, populate?: any): Promise<T>;

  findOneByCondition(condition?: object, projection?: string): Promise<T>;

  findAll(condition: object, options?: object): Promise<FindAllResponse<T>>;

  update(id: string, dto: Partial<T>): Promise<T>;

  updateMany(
    condition: object,
    dto: Partial<T>,
  ): Promise<{
    acknowledged: boolean;
    matchedCount: number;
    modifiedCount: number;
    upsertedCount: number;
    upsertedId: any;
  }>;

  softDelete(id: string): Promise<boolean>;

  permanentlyDelete(id: string): Promise<boolean>;

  deleteManyByCondition(condition?: object): Promise<boolean>;
}
