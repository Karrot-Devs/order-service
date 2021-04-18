import { PaymentType } from '../../shared/types/payment.types';
import { Item } from '../../shared/types/item.types';

export interface OrderDTO {
  paymentType: PaymentType;
  items: Item[];
  restaurantId: string;
  transactionId: string;
  customerId: string;
  deliveryPersonnelId: string;
  amount: number;
  address: string;
}
