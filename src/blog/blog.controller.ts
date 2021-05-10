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
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/multer-options';
import { BlogService } from './blog.service';
import { BlogCreateDTO } from './models/blog-create.dto';
import { BlogUpdateDTO } from './models/blog-update.dto';
import { Blog } from './models/blog.entity';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async create(
    @UploadedFile() file,
    @Body() body: BlogCreateDTO,
  ): Promise<Blog> {
    const { title, desc } = body;
    try {
      return await this.blogService.create({
        title,
        desc,
        image: `http://127.0.0.1:8000/api/${file.path}`,
      });
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async update(
    @Param('id') id: string,
    @UploadedFile() file,
    @Body() body: BlogUpdateDTO,
  ): Promise<Blog> {
    const { title, desc } = body;

    if (file) {
      await this.blogService.update(id, {
        title,
        desc,
        image: `http://127.0.0.1:8000/api/${file.path}`,
      });
      return await this.blogService.findOne({ id });
    }
    await this.blogService.update(id, {
      title,
      desc,
    });
    return await this.blogService.findOne({ id });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Record<string, string>> {
    await this.blogService.delete(id);
    return { message: 'Project Deleted Successfully' };
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<Blog> {
    return await this.blogService.findOne({ id });
  }

  @Get()
  async all(@Query('page') page = 1) {
    return await this.blogService.paginate(page);
  }
}
