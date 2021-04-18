import { Injectable } from '@nestjs/common';
import { OrderDTO } from './order.dto';
import { OrderRepository } from '../../core/repositories/order.repository';
import Order from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  async getAllOrders(): Promise<Order[]> {
    return await this.orderRepository.findAll();
  }

  async placeOrder(order: OrderDTO): Promise<Order> {
    return await this.orderRepository.insertOne(order);
  }
}
