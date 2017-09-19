using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KanitMVC.Controllers.Quotation
{
    public class QuotationController : Controller
    {
        // GET: Quotation
        public ActionResult IndexQuotation()
        {
            return View();
        }
        public ActionResult CreateQuotation()
        {
            return View();
        }
        public ActionResult EditQuotation()
        {
            return View();
        }
    }
}