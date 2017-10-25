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
    public class CompanyDetailController : ApiController
    {
        public CompanyDetailDAL companyDetail = new CompanyDetailDAL();
        [HttpPost]
        public int Post(CompanyDetailModels CompanyDetailModel)
        {
            var response = companyDetail.InsertData(CompanyDetailModel);
            return response;
        }

        //[EnableCorsAttribute("*", "*", "*")]
        //[HttpGet]
        //public string Get()
        //{
        //    var response = companyDetail.SelectData();
        //    return JsonConvert.SerializeObject(response, Formatting.Indented);
        //}

        //[EnableCorsAttribute("*", "*", "*")]
        //[HttpGet]
        //public string Get(int SecurityID)
        //{
        //    var response = companyDetail.SelectBySecurityID(SecurityID);
        //    return JsonConvert.SerializeObject(response, Formatting.Indented);
        //}

        [HttpPut]
        public int Put(CompanyDetailModels CompanyDetailModel)
        {
            var response = 0;

            if (CompanyDetailModel.ID > 0)
            {
                response = companyDetail.UpdateData(CompanyDetailModel);
            }
            else
            {
                response = companyDetail.InsertData(CompanyDetailModel);
            }

            return response;

        }

        [HttpDelete]
        public void Delete(CompanyDetailModels CompanyDetailModel)
        {
            //calling DBData Class Method and storing Repsonse   
            companyDetail.DeleteDetail(CompanyDetailModel);
        }
    }
}
