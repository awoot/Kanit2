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
using KanitApi.DAL.Company;
using KanitApi.Models.Company;

namespace KanitApi.Controllers.Company
{
    [EnableCorsAttribute("*", "*", "*")]
    public class ContactPersonAddressController : ApiController
    {
        public ContactPersonAddressDAL Address = new ContactPersonAddressDAL();

        [HttpGet]
        public string Get(int ID)
        {
            var response = Address.SelectByID(ID);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpPost]
        public void Post(ContactPersonModels data)
        {
            Address.UpdateData(data);
        }

        [HttpDelete]
        public void Delete(ContactPersonAddressModels data)
        {
            //calling DBData Class Method and storing Repsonse   
            Address.DeleteData(data.ContactPersonID);
        }
    }
}