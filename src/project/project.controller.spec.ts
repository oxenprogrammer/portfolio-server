import { Project } from './models/project.entity';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Repository } from 'typeorm';

describe('ProjectController', () => {
  let projectService: ProjectService;
  let projectController: ProjectController;
  let prpojectRepository: Repository<Project>;

  beforeEach(() => {
    projectService = new ProjectService(prpojectRepository);
    projectController = new ProjectController(projectService);
  });

  it('should return a collection of projects', async () => {
    const result = {
      data: [],
      meta: {
        total: 0,
        page: 1,
        last_page: 0,
      },
    };
    projectService.paginate = jest.fn().mockImplementation((): any => result);
    expect(await projectController.all(1)).toEqual(result);
  });
});
