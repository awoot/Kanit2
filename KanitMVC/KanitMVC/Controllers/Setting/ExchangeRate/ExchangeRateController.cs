using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KanitMVC.Controllers.Setting.ExchangeRate
{
    public class ExchangeRateController : Controller
    {
        // GET: ExchangeRate
        public ActionResult IndexExchangeRate()
        {
            return View();
        }
        public ActionResult CreateExchangeRate()
        {
            return View();
        }
        public ActionResult EditExchangeRate()
        {
            return View();
        }
    }
}