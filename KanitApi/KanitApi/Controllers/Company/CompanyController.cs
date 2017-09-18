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
    public class CompanyController : ApiController
    {
        public CompanyDAL Company = new CompanyDAL();
        [HttpPost]
        public int Post(CompanyModels CompanyModel)
        {
            var response = Company.InsertData(CompanyModel);
            return response;
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        public string Get()
        {
            var response = Company.SelectData();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        public string Get(int ID)
        {
            var response = Company.SelectByID(ID);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpPut]
        public int Put(CompanyModels CompanyModel)
        {
            var response = 0;
            response = Company.UpdateData(CompanyModel);

            //if (CompanyModel.ID > 0)
            //{
                
            //}
            //else
            //{
            //    response = Company.InsertData(CompanyModel);
            //}

            return response;

        }

        [HttpDelete]
        public void Delete(CompanyModels CompanyModel)
        {
            //calling DBData Class Method and storing Repsonse   
            Company.DeleteData(CompanyModel);
        }
    }
}
