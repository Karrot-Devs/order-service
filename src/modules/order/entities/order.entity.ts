import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OrderStatus } from '../../../shared/types/order.types';
import { PaymentType } from '../../../shared/types/payment.types';
import { Item } from '../../../shared/types/item.types';

@Entity()
export default class Order {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  paymentType: PaymentType;

  @Column({ type: 'simple-json' })
  items: Item[];

  @Column()
  restaurantId: string;

  @Column()
  transactionId: string;

  @Column()
  customerId: string;

  @Column()
  deliveryPersonnelId: string;

  @Column()
  amount: number;

  @Column()
  address: string;

  @Column({ default: 0 })
  deduction: number;

  @Column({ default: 0 })
  totalGST: number;

  @Column({
    type: 'simple-enum',
    enum: OrderStatus,
    default: OrderStatus.PLACED,
  })
  status: OrderStatus;
}
