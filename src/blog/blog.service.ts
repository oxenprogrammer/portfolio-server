import { AbstractService } from './../common/abstract.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './models/blog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService extends AbstractService {
  constructor(
    @InjectRepository(Blog) private readonly blogRepository: Repository<Blog>,
  ) {
    super(blogRepository);
  }
}
