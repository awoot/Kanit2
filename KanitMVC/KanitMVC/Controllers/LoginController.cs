using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KanitMVC.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult IndexLogin()
        {
            return View();
        }

        public ActionResult ForgotPassword()
        {
            return View();
        }
    }
}