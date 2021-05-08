import { CommonModule } from 'src/common/common.module';
import { Module } from '@nestjs/common';
import { Product } from './models/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadController } from './upload.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CommonModule],
  providers: [ProductService],
  controllers: [ProductController, UploadController],
})
export class ProductModule {}
