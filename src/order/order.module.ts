import { CommonModule } from 'src/common/common.module';
import { Module } from '@nestjs/common';
import { Order } from './models/order.entity';
import { OrderController } from './order.controller';
import { OrderItem } from './models/order-item.entity';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [CommonModule, TypeOrmModule.forFeature([Order, OrderItem])],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
