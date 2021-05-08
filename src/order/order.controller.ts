import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';

import { OrderService } from './order.service';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';

@Controller('order')
export class OrderController {
  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private userService: UserService,
    private productService: ProductService,
  ) {}

  @Get()
  async all(@Query('page') page = 1) {
    return await this.orderService.paginate(page, ['order_items']);
  }

  @Post(':id')
  async create(
    @Param('id') id: string,
    @Req() request: Request,
    @Body('quantity') quantity: number,
  ) {
    const userId = await this.authService.userId(request);
    const user = await this.userService.findOne({ userId });
    const product = await this.productService.findOne({ id });

    return await this.orderService.create({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      order_items: {
        product_title: product.title,
        price: product.price,
        quantity: quantity,
      },
    });
  }
}
