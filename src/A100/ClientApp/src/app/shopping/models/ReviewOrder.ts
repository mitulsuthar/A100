import { ShoppingCartProduct } from './shoppingCartProduct';
import { ShippingInfo } from './ShippingInfo';
import { PaymentInfo } from './PaymentInfo';

export class ReviewOrder {
    shoppingCartProducts: ShoppingCartProduct[];
    shippingInfo: ShippingInfo;
    paymentInfo: PaymentInfo;
}
