import { FilterQuery, Model, QueryOptions, Document } from 'mongoose';
import { BaseRepositoryInterface } from './base.interface.repository';
import { paginationQuery } from '../utils';

export abstract class BaseRepositoryAbstract<T extends Document>
  implements BaseRepositoryInterface<T>
{
  protected constructor(private readonly model: Model<T>) {
    this.model = model;
  }

  async create(dto: T | any): Promise<T> {
    const createdData = new this.model(dto);
    return await createdData.save();
  }

  async findOneById(id: string, populate = []): Promise<T> {
    const item = await this.model.findById(id).populate(populate).exec();
    return item ?? null;
  }

  async findOneByCondition(condition?: object): Promise<T> {
    return await this.model
      .findOne({
        ...condition,
        deletedAt: null,
      })
      .exec();
  }

  async findAll(
    condition: FilterQuery<T>,
    options?: QueryOptions<T>,
  ): Promise<FindAllResponse<T>> {
    const [total, items] = await Promise.all([
      this.model.countDocuments({ ...condition, deletedAt: null }),
      this.model.find(
        { ...condition, deletedAt: null },
        options?.projection,
        options,
      ),
    ]);

    const paginate = paginationQuery(options as Pagination);
    return {
      pagination: {
        limit: Number(paginate.limit) || 10,
        page: Number(paginate.page) || 1,
        total,
      },
      items,
    } as ResponseAllWithPaginate;
  }

  async update(id: string, dto: Partial<T>): Promise<T> {
    return this.model.findOneAndUpdate(
      { _id: id, deletedAt: null } as FilterQuery<T>,
      dto,
      {
        new: true,
      },
    );
  }

  async updateMany(
    condition: FilterQuery<T>,
    dto: Partial<T>,
  ): Promise<{
    acknowledged: boolean;
    matchedCount: number;
    modifiedCount: number;
    upsertedCount: number;
    upsertedId: any;
  }> {
    return this.model.updateMany(condition, dto).exec();
  }

  async softDelete(id: string): Promise<boolean> {
    const deleteItem = await this.model.findById(id);
    if (!deleteItem) {
      return false;
    }

    return !!(await this.model
      .findByIdAndUpdate<T>(id, { deletedAt: new Date() })
      .exec());
  }

  async permanentlyDelete(id: string): Promise<boolean> {
    const deleteItem = await this.model.findById(id);
    if (!deleteItem) {
      return false;
    }
    return !!(await this.model.findByIdAndDelete(id));
  }

  async deleteManyByCondition(condition?: object): Promise<boolean> {
    await this.model.deleteMany({
      ...condition,
    });
    return true;
  }
}
