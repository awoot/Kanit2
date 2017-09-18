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
    public class ContactAddressController : ApiController
    {
        public ContactAddressDAL ContactAddress = new ContactAddressDAL();

        [HttpPost]
        public int Post(ContactAddressModels ContactAddressModel)
        {
            var response = 0;

            response = ContactAddress.InsertData(ContactAddressModel);

            return response;
        }

        [HttpPut]
        public int Put(ContactAddressModels ContactAddressModel)
        {
            var response = 0;
            if (ContactAddressModel.ID > 0)
            {
                response = ContactAddress.UpdateData(ContactAddressModel);
            }
            else
            {
                response = ContactAddress.InsertData(ContactAddressModel);
            }
            return response;

        }
        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        public string Get(int id)
        {
            var response = ContactAddress.SelectByID(id);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }
        [HttpDelete]
        public int Delete(ContactAddressModels ContactAddressModel)
        {
            var response = ContactAddress.DeleteData(ContactAddressModel);
            return response;
        }
    }
}
