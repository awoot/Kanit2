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

namespace KanitApi.Controllers.Company
{
    [EnableCorsAttribute("*", "*", "*")]
    public class ContactPersonController : ApiController
    {
        public ContactPersonDAL ContactPerson = new ContactPersonDAL();
        [HttpPost]
        public int Post(ContactPersonModels ContactPersonModel)
        {
            var response = ContactPerson.InsertData(ContactPersonModel);
            return response;
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        public string Get(int ID)
        {
            var response = ContactPerson.SelectByID(ID);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpPut]
        public int Put(ContactPersonModels ContactPersonModel)
        {
            var response = 0;
            response = ContactPerson.UpdateData(ContactPersonModel);
            return response;

        }

        [HttpDelete]
        public void Delete(ContactPersonModels ContactPersonModel)
        {
            //calling DBData Class Method and storing Repsonse   
            ContactPerson.DeleteData(ContactPersonModel);
        }
    }
}
