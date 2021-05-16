import { AbstractService } from './../common/abstract.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './models/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService extends AbstractService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {
    super(projectRepository);
  }
}
