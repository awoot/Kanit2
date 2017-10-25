using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using KanitApi.DAL.GM;
using System.Data;
using System.Json;
using Newtonsoft.Json;
using System.Web.Http.Cors;

namespace KanitApi.Controllers.GM
{
    [EnableCorsAttribute("*", "*", "*")]
    public class IndustryMasterController : ApiController
    {
        public IndustryMasterDAL IndustryMaster = new IndustryMasterDAL();
        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        public string Get()
        {
            var response = IndustryMaster.SelectMaster();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }
    }
}
