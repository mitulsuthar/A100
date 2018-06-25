using A100.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace A100.Controllers
{
    [Route("api/[controller]")]
    public class ShoppingCartController : Controller
    {
        private static List<Product> shoppingCartProducts = new List<Product>() {
            new Product { Id = 1, Title = "XYZ1",Description = "Description XYZ 1 ", Price = 101,ImageUrl = "ImageUrl_XYZ1" },
            new Product { Id = 1, Title = "XYZ1",Description = "Description XYZ 1 ", Price = 101,ImageUrl = "ImageUrl_XYZ1" },
            new Product { Id = 1, Title = "XYZ1",Description = "Description XYZ 1 ", Price = 101,ImageUrl = "ImageUrl_XYZ1" },
            new Product { Id = 2, Title = "XYZ2",Description = "Description XYZ 2 ", Price = 200,ImageUrl = "ImageUrl_XYZ2" }
        };
        [HttpGet("[action]")]
        public IEnumerable<ShoppingCartProduct> Products()
        {
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

        [HttpPost("[action]/{id:int}")]
        public ActionResult Add(int id)
        {
            return new JsonResult("product added to cart");
        }
        [HttpPost("[action]/{id:int}")]
        public ActionResult Delete(int id)
        {
            return new JsonResult("product removed from cart");
        }
    }
}
