import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import Order from './entities/order.entity';
import { OrderDTO } from './order.dto';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  async getAllOrders(): Promise<Order[]> {
    return await this.orderService.getAllOrders();
  }

  @Post()
  async placeOrder(@Body() order: OrderDTO): Promise<Order> {
    return await this.orderService.placeOrder(order);
  }
}
