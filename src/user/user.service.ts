import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractPaginationDTO } from './../common/abstract-pagination.dto';
import { AbstractService } from './../common/abstract.service';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';

@Injectable()
export class UserService extends AbstractService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async paginate(page: number, relations = []): Promise<AbstractPaginationDTO> {
    const { data, meta } = await super.paginate(page, relations);
    return {
      data: data.map((user) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...data } = user;
        return data;
      }),
      meta,
    };
  }
}
