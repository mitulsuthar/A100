import { Address } from './Address';

export class PaymentInfo {
    NameOnCard = '';
    CardNumber = '';
    CardType = '';
    SecurityCode = '' ;
    BillingAddress: Address;
}
