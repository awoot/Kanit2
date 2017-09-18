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
    public class MenuMasterController : ApiController
    {
        public MenuMasterDAL MenuMaster = new MenuMasterDAL();
        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        public string Get()
        {
            var response = MenuMaster.SelectMenuMaster();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        [Route("api/MenuMaster/GetMenuAll")]
        public string GetMenuAll()
        {
            var response = MenuMaster.SelectMenuMasterAll();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }
        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        public string Get(int ID)
        {
            var response = MenuMaster.SelectByGroupID(ID);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }
    }
}
