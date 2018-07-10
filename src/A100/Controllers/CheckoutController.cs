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
    }
}
