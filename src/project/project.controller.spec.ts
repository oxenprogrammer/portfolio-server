import { BadGatewayException } from '@nestjs/common';
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
    // projectService.paginate = jest.fn().mockImplementation((): any => result);
    const spy = jest
      .spyOn(projectService, 'paginate')
      .mockImplementation((): any => result);
    expect(await projectController.all(1)).toEqual(result);
    expect(spy).toBeCalledTimes(1);
  });

  it('should return a projects', async () => {
    const result = {
      id: '1',
      title: 'first project',
      desc: 'description',
      image: 'my image',
      lanaguages: ['image1', 'image2'],
    };
    const spy = jest
      .spyOn(projectService, 'findOne')
      .mockImplementation((): any => result);
    expect(await projectController.get('1')).toEqual(result);
    expect(spy).toBeCalledTimes(1);
  });

  it('should not delete a project that does not exists', async () => {
    const deleteSpy = jest.spyOn(projectService, 'delete');
    const findSpy = jest
      .spyOn(projectService, 'findOne')
      .mockImplementation((): any => undefined);
    try {
      await projectController.delete('1');
    } catch (error) {
      expect(error).toBeInstanceOf(BadGatewayException);
    }

    expect(deleteSpy).toBeCalledTimes(0);
    expect(findSpy).toBeCalledTimes(1);
  });

  it('should delete a projects that exists', async () => {
    const result = {
      id: '1',
      title: 'first project',
      desc: 'description',
      image: 'my image',
      lanaguages: ['image1', 'image2'],
    };
    jest.spyOn(projectService, 'findOne').mockImplementation((): any => result);
    const spy = jest
      .spyOn(projectService, 'delete')
      .mockImplementation((): any => result);
    expect(await projectController.delete('1')).toBeTruthy;
    expect(spy).toBeCalledTimes(1);
  });
});
