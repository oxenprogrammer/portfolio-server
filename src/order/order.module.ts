import { AuthModule } from 'src/auth/auth.module';
import { CommonModule } from 'src/common/common.module';
import { Module } from '@nestjs/common';
import { Order } from './models/order.entity';
import { OrderController } from './order.controller';
import { OrderItem } from './models/order-item.entity';
import { OrderService } from './order.service';
import { ProductModule } from 'src/product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([Order, OrderItem]),
    AuthModule,
    UserModule,
    ProductModule,
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
