using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using KanitApi.DAL.Login;
using KanitApi.Models.Setting.User;
using System.Data;
using System.Json;
using Newtonsoft.Json;
using System.Web.Http.Cors;

namespace KanitApi.Controllers.Login
{
    [EnableCorsAttribute("*", "*", "*")]
    public class LoginController : ApiController
    {
        static LoginDAL Logindb = new LoginDAL();
        [HttpGet]
        [Route("api/Login/Authenticate/{userName}/{Password}")]
        public string Authenticate(string userName, string Password)
        {
            //string[] str = userName.Split('&');
            //var response = Userdb.Authenticate(str[0],str[1]);
            var response = Logindb.Authenticate(userName, Password);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpGet]
        public string Authenticate(string userName)
        {
            string[] str = userName.Split('&');
            var response = Logindb.Authenticate(str[0], str[1]);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpGet]
        public void SendEmailResetPassword(string email)
        {
            Logindb.SendEmailResetPassword(email);
        }
    }
}
