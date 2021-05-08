import {
  BadRequestException,
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
import { ProductCreateDTO } from './models/product-create.dto';
import { ProductUpdateDTO } from './models/product-update.dto';
import { Product } from './models/product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async all(@Query('page') page = 1) {
    return await this.productService.paginate(page);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async create(
    @UploadedFile() file,
    @Body() body: ProductCreateDTO,
  ): Promise<Product[]> {
    const { title, desc, price } = body;
    try {
      return await this.productService.create({
        title,
        desc,
        price,
        image: `http://127.0.0.1:8000/api/${file.path}`,
      });
    } catch (error) {
      throw new BadRequestException('Product creation failed');
    }
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<Product> {
    return await this.productService.findOne({ id });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: ProductUpdateDTO,
  ): Promise<Product> {
    await this.productService.update(id, body);
    return await this.productService.findOne({ id });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Record<string, string>> {
    await this.productService.delete(id);
    return { message: 'Product Deleted Successfully' };
  }
}
