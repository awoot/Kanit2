using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using KanitApi.DAL.Setting.ExchangeRate;
using KanitApi.Models.Setting.ExchangeRate;
using System.Data;
using System.Json;
using Newtonsoft.Json;
using System.Web.Http.Cors;
using KanitApi.Providers;

namespace KanitApi.Controllers
{
    [EnableCorsAttribute("*", "*", "*")]
    public class DashboardController : ApiController
    {
        [HttpGet]
        public string Get()
        {
            var response = CommonProvider.Instance.GetInfoDashboard();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }
    }
}
