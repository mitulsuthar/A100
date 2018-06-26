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
        [HttpGet("[action]")]
        public IEnumerable<ShoppingCartProduct> Products()
        {
            return _getShoppingCartProduct();
        }

        [HttpPost("[action]/{id:int}")]
        public ActionResult Add(int id)
        {
            return new JsonResult("product added to cart");
        }
        [HttpPost("[action]/{id:int}")]
        public IEnumerable<ShoppingCartProduct> Delete(int id)
        {
            return _getShoppingCartProduct().Where(x => x.Id != id).ToList();
        }

        [HttpPost("[action]/{id:int}/{quantity:int}")]
        public IEnumerable<ShoppingCartProduct> Update(int id, int quantity)
        {
            //TODO: Remove all this logic when hooked up to database.
            var product = _getShoppingCartProduct().Find(x => x.Id == id); 
            product.Quantity = quantity;
            var products = new List<ShoppingCartProduct>();
            products.Add(product);
            foreach(var p in _getShoppingCartProduct().Where(x => x.Id != id)){
                products.Add(p);
            }   
            return products;
        }
    }
}
