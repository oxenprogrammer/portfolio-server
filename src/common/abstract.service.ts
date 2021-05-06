import { AbstractPaginationDTO } from './abstract-pagination.dto';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export abstract class AbstractService {
  protected constructor(protected readonly repository: Repository<any>) {}

  async all(relations = []): Promise<any[]> {
    return await this.repository.find({ relations });
  }

  async create(data): Promise<any> {
    return await this.repository.save(data);
  }

  async findOne(data, relations = []): Promise<any> {
    return await this.repository.findOne(data, { relations });
  }

  async update(id: string, data: any): Promise<any> {
    return await this.repository.update(id, data);
  }

  async delete(id: string): Promise<any> {
    return await this.repository.delete(id);
  }

  async paginate(page: number): Promise<AbstractPaginationDTO> {
    const take = 10;
    const [data, total] = await this.repository.findAndCount({
      take,
      skip: (page - 1) * take,
    });
    return {
      data: data,
      meta: {
        total,
        page,
        last_page: Math.ceil(total / take),
      },
    };
  }
}
