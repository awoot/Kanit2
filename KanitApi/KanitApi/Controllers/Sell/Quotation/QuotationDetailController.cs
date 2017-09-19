using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using KanitApi.DAL.Sell.Quotation;
using KanitApi.Models.Sell.Quotation;
using System.Data;
using System.Json;
using Newtonsoft.Json;
using System.Web.Http.Cors;

namespace KanitApi.Controllers.Sell.Quotation
{
    [EnableCorsAttribute("*", "*", "*")]
    public class QuotationDetailController : ApiController
    {
        static QuotationDetailDAL QuotationDetaildb = new QuotationDetailDAL();

        [HttpGet]
        public string Get()
        {
            var response = QuotationDetaildb.SelectData();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        public string Get(int id)
        {
            var response = QuotationDetaildb.SelectByID(id);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpPost]
        public void Post(QuotationDetailModels QuotationDetailModel)
        {
            QuotationDetaildb.InsertData(QuotationDetailModel);
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpPut]
        public int Put(QuotationDetailModels QuotationDetailModel)
        {
            var response = QuotationDetaildb.UpdateData(QuotationDetailModel);
            return response;
        }

        [HttpDelete]
        public int Delete(QuotationDetailModels QuotationDetailModel)
        {
            var response = QuotationDetaildb.DeleteData(QuotationDetailModel);
            return response;
        }
    }
}
