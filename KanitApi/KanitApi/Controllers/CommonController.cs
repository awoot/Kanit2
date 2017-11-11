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
using KanitApi.DAL.Product.Stock;

namespace KanitApi.Controllers
{
    [EnableCorsAttribute("*", "*", "*")]
    public class CommonController : ApiController
    {
        [HttpGet]
        public string InfoDashboard()
        {
            var response = CommonProvider.Instance.GetInfoDashboard();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpGet]
        public string Search(string type, string keyword)
        {
            object response = null;

            switch (type.Trim().ToUpper())
            {
                case "PRODUCT":
                    {
                        response = (new ProductDAL()).Search(keyword);
                    }
                    break;
            }

            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }
    }
}
