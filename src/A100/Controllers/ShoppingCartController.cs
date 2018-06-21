using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApplication2.Models;

namespace A100.Controllers
{
    [Route("api/[controller]")]
    public class ShoppingCartController : Controller
    {
        private static List<Product> shoppingCartProducts = new List<Product>() {
            new Product { Id = 1, Title = "XYZ1",Description = "Description XYZ 1 - HARD CODED SHOPPING CART", Price = 101,ImageUrl = "ImageUrl_XYZ1" },
            new Product { Id = 2, Title = "XYZ2",Description = "Description XYZ 2 - HARD CODED SHOPPING CART", Price = 200,ImageUrl = "ImageUrl_XYZ2" }
        };
        [HttpGet("[action]")]
        public IEnumerable<Product> Products()
        {
            return shoppingCartProducts;
        }

        [HttpPost("[action]/{id:int}")]
        public ActionResult Add(int id)
        {
            return new JsonResult("product added to cart");
        }
    }
}
