import { Body, Controller, Get, Param, Post, Sse } from '@nestjs/common';
import { OrderService } from './order.service';
import Order from './entities/order.entity';
import { OrderDTO, OrderStatusChangeEvent } from './order.dto';
import { interval, Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { OnEvent, EventEmitter2 } from '@nestjs/event-emitter';

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

  @Sse('status/sse/:userId')
  async getOrderStatusSse(
    @Param() params: { userId: string },
  ): Promise<Observable<OrderStatusChangeEvent>> {
    return await this.orderService.getOrderStatusEventByCustomerId(
      params.userId,
    );
  }

  @Post('status/update/:userId')
  async updateNotify(@Param() params: { userId: string }): Promise<void> {
    await this.orderService.updateOrderStatusSse(params.userId);
  }
}
