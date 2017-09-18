using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using KanitApi.DAL.Company;
using KanitApi.Models.Company;
using System.Data;
using System.Json;
using Newtonsoft.Json;
using System.Web.Http.Cors;

namespace KanitApi.Controllers.Address
{
    [EnableCorsAttribute("*", "*", "*")]
    public class AddressController : ApiController
    {
        public AddressDAL Address = new AddressDAL();
        [HttpPost]
        public int Post(AddressModels AddressModel)
        {
            var response = Address.InsertData(AddressModel);
            return response;
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        public string Get(int ID)
        {
            var response = Address.SelectByID(ID);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpPut]
        public int Put(AddressModels AddressModel)
        {
            var response = 0;
            response = Address.UpdateData(AddressModel);
            return response;

        }

        [HttpDelete]
        public void Delete(AddressModels AddressModel)
        {
            //calling DBData Class Method and storing Repsonse   
            Address.DeleteData(AddressModel);
        }
    }
}
