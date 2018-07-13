using System.Collections.Generic;

namespace A100.Models {
    public class ReviewOrder {
        public List<ShoppingCartProduct> ShoppingCartProducts {get;set;}
        public ShippingInfo ShippingInfo {get;set;}
        public PaymentInfo PaymentInfo {get;set;}
    }
}