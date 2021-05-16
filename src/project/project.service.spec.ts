import { Project } from './models/project.entity';
import { ProjectService } from './project.service';
import { Repository } from 'typeorm';
import { Test } from '@nestjs/testing/test';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AbstractService', () => {
  let projectService: ProjectService;
  let repository: Repository<Project>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProjectService,
        {
          provide: getRepositoryToken(Project),
          useValue: {
            all: jest.fn(),
            create: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            paginate: jest.fn(),
          },
        },
      ],
    }).compile();
    projectService = module.get<ProjectService>(ProjectService);
    repository = module.get<Repository<Project>>(getRepositoryToken(Project));
  });

  describe('Perform CRUD', () => {
    const result = {
      id: '1',
      title: 'first project',
      desc: 'description',
      image: 'my image',
      languages: ['image1', 'image2'],
    };
    it('should create a project', async () => {
      const reposSpy = jest.spyOn(repository, 'create');
      expect(projectService.create(result)).toBeTruthy;
      expect(reposSpy).toBeCalledTimes(0);
    });

    it('should update a project', async () => {
      const reposSpy = jest.spyOn(repository, 'update');
      expect(projectService.update('1', result)).toBeTruthy;
      expect(reposSpy).toBeCalledTimes(1);
    });

    it('should find a project', async () => {
      const reposSpy = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(result);
      expect(projectService.findOne('1')).toBeTruthy;
      expect(reposSpy).toBeCalledTimes(1);
    });
  });
});
