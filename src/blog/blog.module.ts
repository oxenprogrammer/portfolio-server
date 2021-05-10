import { Blog } from './models/blog.entity';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { CommonModule } from 'src/common/common.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Blog]), CommonModule],
  providers: [BlogService],
  controllers: [BlogController],
  exports: [BlogService],
})
export class BlogModule {}
