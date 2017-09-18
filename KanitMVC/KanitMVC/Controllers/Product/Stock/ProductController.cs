using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KanitMVC.Controllers.Product.Stock
{
    public class ProductController : Controller
    {
        // GET: Product
        public ActionResult IndexProduct()
        {
            return View();
        }
        public ActionResult CreateProduct()
        {
            return View();
        }
        public ActionResult EditProduct()
        {
            return View();
        }
    }
}