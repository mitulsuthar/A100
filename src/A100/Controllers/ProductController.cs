using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApplication2.Models;

namespace WebApplication2.Controllers
{
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private static List<Product> Products = new List<Product>() {
            new Product { Id = 1, Title = "XYZ1", Price = 101,ImageUrl = "ImageUrl_XYZ1" },
            new Product { Id = 2, Title = "XYZ2", Price = 200,ImageUrl = "ImageUrl_XYZ2" },
            new Product { Id = 3, Title = "XYZ3", Price = 300,ImageUrl = "ImageUrl_XYZ3" },
            new Product { Id = 4, Title = "XYZ4", Price = 400,ImageUrl = "ImageUrl_XYZ4" },
            new Product { Id = 5, Title = "XYZ5", Price = 500,ImageUrl = "ImageUrl_XYZ5" },
            new Product { Id = 6, Title = "XYZ6", Price = 600,ImageUrl = "ImageUrl_XYZ6" },
            new Product { Id = 7, Title = "XYZ7", Price = 700,ImageUrl = "ImageUrl_XYZ7" },
            new Product { Id = 8, Title = "XYZ8", Price = 800,ImageUrl = "ImageUrl_XYZ8" },
            new Product { Id = 9, Title = "XYZ9", Price = 800,ImageUrl = "ImageUrl_XYZ9" },
            new Product { Id = 10, Title = "XYZ10", Price = 800,ImageUrl = "ImageUrl_XYZ10" },
            new Product { Id = 11, Title = "XYZ11", Price = 101,ImageUrl = "ImageUrl_XYZ11" },
            new Product { Id = 12, Title = "XYZ12", Price = 200,ImageUrl = "ImageUrl_XYZ12" },
            new Product { Id = 13, Title = "XYZ13", Price = 300,ImageUrl = "ImageUrl_XYZ13" },
            new Product { Id = 14, Title = "XYZ14", Price = 400,ImageUrl = "ImageUrl_XYZ14" },
            new Product { Id = 15, Title = "XYZ15", Price = 500,ImageUrl = "ImageUrl_XYZ15" },
            new Product { Id = 16, Title = "XYZ16", Price = 600,ImageUrl = "ImageUrl_XYZ16" },
            new Product { Id = 17, Title = "XYZ17", Price = 700,ImageUrl = "ImageUrl_XYZ17" },
            new Product { Id = 18, Title = "XYZ18", Price = 800,ImageUrl = "ImageUrl_XYZ18" },
            new Product { Id = 19, Title = "XYZ19", Price = 900,ImageUrl = "ImageUrl_XYZ19" }
            
        };
        [HttpGet("[action]")]
        public IEnumerable<Product> List()
        {
            return Products;
        }

        [HttpGet("[action]/{id:int}")]        
        public ActionResult<Product> Find(int id)
        {
            var product = Products.Where(x => x.Id == id).FirstOrDefault();
            if (product != null)
            {
                return product;
            }
            return NotFound($"Product with id {id} was not found");
        }

        [HttpPost("[action]")]
        public ActionResult<Product> Edit([FromBody] Product product)
        {
            _validateProduct(product);
            if (ModelState.IsValid)
            {
                //TODO: Save Product to database.
                return product;
            }
            return BadRequest(ModelState);
        }


        [HttpPost("[action]/{id:int}")]
        public ActionResult Delete(int id)
        {
            return Ok("Delete Successfull");
        }

        [HttpPost("[action]")]
        public ActionResult<Product> Insert([FromBody] Product product)
        {
            _validateProduct(product);
            if (ModelState.IsValid)
            {
                //TODO: Save Product to database.
                return product;
            }
            return BadRequest(ModelState);
        }

        private void _validateProduct(Product product)
        {
            if (product.Price < 100)
            {
                ModelState.AddModelError(nameof(Product.Price), $"Product price cannot be less than 100, you entered {product.Price}");
            }
        }
    }
}
