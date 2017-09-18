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
    public class AddressMasterController : ApiController
    {
        public AddressMasterDAL AddressMasterdb = new AddressMasterDAL();
        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        public string Get()
        {
            var response = AddressMasterdb.SelectProvince();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }
        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        [Route("api/AddressMaster/GetAmphurAll")]
        public string GetAmphurAll()
        {
            var response = AddressMasterdb.SelectAmphur();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }
        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        [Route("api/AddressMaster/GetDistrictAll")]
        public string GetDistrictAll()
        {
            var response = AddressMasterdb.SelectDistrict();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }
        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        [Route("api/AddressMaster/GetAmphurByProvinceID")]
        public string GetAmphurByProvinceID(int ProvinceID)
        {
            var response = AddressMasterdb.SelectAmphurByProvinceID(ProvinceID);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }
        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        [Route("api/AddressMaster/GetDistrictByAmphurID")]
        public string GetDistrictByAmphurID(int AmphurID)
        {
            var response = AddressMasterdb.SelectDistrictByAmphurID(AmphurID);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }
    }
}
