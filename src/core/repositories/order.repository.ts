import { EntityRepository, Repository } from 'typeorm';
import Order from '../../modules/order/entities/order.entity';
import { OrderDTO } from '../../modules/order/order.dto';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  findAll(): Promise<Order[]> {
    return this.find({});
  }

  insertOne(entity: OrderDTO) {
    return this.save(entity);
  }
}
