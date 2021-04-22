import { Injectable } from '@nestjs/common';
import { OrderDTO, OrderStatusChangeEvent } from './order.dto';
import { OrderRepository } from '../../core/repositories/order.repository';
import Order from './entities/order.entity';
import { OrderStatus } from '../../shared/types/order.types';
import { Observable } from 'rxjs';
import { SseSubject } from '../../shared/lib/SseSubject';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  private orderStatuses = new Map<string, SseSubject>();

  async getOrderStatusEventByCustomerId(
    id: string,
  ): Promise<Observable<OrderStatusChangeEvent>> {
    if (!this.orderStatuses[id]) {
      this.orderStatuses[id] = new SseSubject();
      this.orderStatuses[id].next({
        status: await this.getOrderStatusByCustomerId(id),
      });
    }

    return this.orderStatuses[id].asObservable();
  }

  async updateOrderStatusSse(id: string): Promise<void> {
    this.orderStatuses[id].next({
      status: await this.getOrderStatusByCustomerId(id),
    });
  }

  async getAllOrders(): Promise<Order[]> {
    return await this.orderRepository.findAll();
  }

  async placeOrder(order: OrderDTO): Promise<Order> {
    return await this.orderRepository.insertOne(order);
  }

  async getOrderStatusByCustomerId(id: string): Promise<OrderStatus> {
    const order = await this.orderRepository.findOne({ customerId: id });
    return order.status;
  }
}
