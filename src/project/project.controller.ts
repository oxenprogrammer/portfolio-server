import {
  BadGatewayException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';
import { multerOptions } from 'src/common/multer-options';
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
    const { title, desc, language } = body;
    try {
      return await this.projectService.create({
        title,
        desc,
        language,
        image: `http://127.0.0.1:8000/api/${file.path}`,
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
    const { title, desc, language } = body;

    if (file) {
      await this.projectService.update(id, {
        title,
        desc,
        language,
        image: `http://127.0.0.1:8000/api/${file.path}`,
      });
      return await this.projectService.findOne({ id });
    }
    await this.projectService.update(id, {
      title,
      desc,
      language,
    });
    return await this.projectService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Record<string, string>> {
    await this.projectService.delete(id);
    return { message: 'Project Deleted Successfully' };
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
