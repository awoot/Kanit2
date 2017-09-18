using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KanitMVC.Controllers.Company
{
    public class CompanyController : Controller
    {
        // GET: Company
        public ActionResult IndexCompany()
        {
            return View();
        }
        public ActionResult CreateCompany()
        {
            return View();
        }
        public ActionResult EditCompany()
        {
            return View();
        }
    }
}