using A100.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace A100.Controllers
{
    [Route("api/[controller]")]
    public class CheckoutController : Controller
    {
        private static List<Product> shoppingCartProducts = new List<Product>() {
            new Product { Id = 1, Title = "XYZ1",Description = "Description XYZ 1 ", Price = 101,ImageUrl = "ImageUrl_XYZ1" },
            new Product { Id = 1, Title = "XYZ1",Description = "Description XYZ 1 ", Price = 101,ImageUrl = "ImageUrl_XYZ1" },
            new Product { Id = 1, Title = "XYZ1",Description = "Description XYZ 1 ", Price = 101,ImageUrl = "ImageUrl_XYZ1" },
            new Product { Id = 2, Title = "XYZ2",Description = "Description XYZ 2 ", Price = 200,ImageUrl = "ImageUrl_XYZ2" }
        };

        //TODO: Remove all this logic when connected to database
        private static List<ShoppingCartProduct> _getShoppingCartProduct(){
            var s = from y in shoppingCartProducts
                    group y by y.Id into grouping
                    let p = grouping.First()
                    select new ShoppingCartProduct { Id = grouping.Key,
                        Title = p.Title,
                        Quantity = grouping.Count(),
                        Price = p.Price,
                        Description = p.Description,
                        ImageUrl = p.ImageUrl,
                        TotalPrice = p.Price * grouping.Count() };
            return s.ToList();
        }

         [HttpPost("ShippingInfo/[action]")]
        public ActionResult<ShippingInfo> Insert([FromBody] ShippingInfo shippingInfo)
        {
            //_validateProduct(shippingInfo);
            if (ModelState.IsValid)
            {                
                return shippingInfo;
            }
            return BadRequest(ModelState);
        }
         [HttpPost("PaymentInfo/[action]")]
        public ActionResult<PaymentInfo> Insert([FromBody] PaymentInfo paymentInfo)
        {
            //_validateProduct(paymentInfo);
            if (ModelState.IsValid)
            {
                //TODO: Save Product to database.
                return paymentInfo;
            }
            return BadRequest(ModelState);
        }

        [HttpGet("Order/[action]")]
        public ActionResult<ReviewOrder> Review()
        {
            var reviewOrder = new ReviewOrder () { 
                ShoppingCartProducts = new List<ShoppingCartProduct>(),
                ShippingInfo = new ShippingInfo(),
                PaymentInfo = new PaymentInfo()                
            };
            reviewOrder.ShoppingCartProducts.AddRange(_getShoppingCartProduct());
            reviewOrder.ShippingInfo.Contact = new Contact(){FirstName = "Spider", LastName = "Man", Email = "spiderman@gmail.com", Phone = "123-123-1234" };
            reviewOrder.ShippingInfo.ShippingAddress = new Address() { Street = "1234 Worm Street", City = "Spartan", State = "Ohio", Zip = "12345" };
            reviewOrder.PaymentInfo.CardInfo = new CardInfo() { CardNumber = "234234232342423", CardType = "VISA", NameOnCard = "noc",SecurityCode = "sc", ExpirationDate = new ExpirationDate() { ExpirationMonth = "", ExpirationYear = ""}  };
            reviewOrder.PaymentInfo.BillingAddress = new Address() { Street = "1234 Worm Street", City = "Spartan", State = "Ohio", Zip = "12345" };

            return reviewOrder;
        }

        [HttpPost("Order/[action]")]
        public ActionResult Submit()
        {
            return Ok();
        }
    }
}
