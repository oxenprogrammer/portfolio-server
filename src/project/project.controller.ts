import {
  BadGatewayException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from './../auth/auth.guard';
import { multerOptions } from './../common/multer-options';
import { ProjectCreateDTO } from './models/project-create.dto';
import { ProjectUpdateDTO } from './models/project-update.dto';
import { Project } from './models/project.entity';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async create(
    @UploadedFile() file,
    @Body() body: ProjectCreateDTO,
  ): Promise<Project> {
    const { title, desc, languages } = body;
    try {
      return await this.projectService.create({
        title,
        desc,
        languages,
        image: `${file.path}`,
      });
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async update(
    @Param('id') id: string,
    @UploadedFile() file,
    @Body() body: ProjectUpdateDTO,
  ): Promise<Project> {
    const { title, desc, languages } = body;

    if (file) {
      await this.projectService.update(id, {
        title,
        desc,
        languages,
        image: `http://127.0.0.1:8000/api/${file.path}`,
      });
      return await this.projectService.findOne({ id });
    }
    await this.projectService.update(id, {
      title,
      desc,
      languages,
    });
    return await this.projectService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Record<string, string>> {
    try {
      const project = await this.projectService.findOne({ id });

      if (project == undefined || null) {
        throw new NotFoundException();
      }

      await this.projectService.delete(id);
      return { message: 'Project Deleted Successfully' };
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<Project> {
    return await this.projectService.findOne({ id });
  }

  @Get()
  async all(@Query('page') page = 1) {
    return await this.projectService.paginate(page);
  }
}
