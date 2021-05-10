import {
  BadGatewayException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/multer-options';
import { ProjectCreateDTO } from './models/project-create.dto';
import { Project } from './models/project.entity';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

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
}
