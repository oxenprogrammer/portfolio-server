import { CommonModule } from 'src/common/common.module';
import { Module } from '@nestjs/common';
import { Project } from './models/project.entity';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), CommonModule],
  providers: [ProjectService],
  controllers: [ProjectController],
  exports: [ProjectService],
})
export class ProjectModule {}
