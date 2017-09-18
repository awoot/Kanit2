﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using KanitApi.DAL.GM;
using Newtonsoft.Json;
using System.Web.Http.Cors;

namespace KanitApi.Controllers.GM
{
    [EnableCorsAttribute("*", "*", "*")]
    public class MasterServiceController : ApiController
    {
        static MasterServiceDAL masterServicedb = new MasterServiceDAL();
        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        public string Get(string typeID)
        {
            var response = masterServicedb.SelectMasterByType(typeID);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }
    }
}
