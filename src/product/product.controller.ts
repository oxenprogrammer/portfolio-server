import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductCreateDTO } from './models/product-create.dto';
import { ProductUpdateDTO } from './models/product-update.dto';
import { Product } from './models/product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  async create(@Body() body: ProductCreateDTO): Promise<Product[]> {
    try {
      return await this.productService.create(body);
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
