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
    public class QuotationWorkFlowController : ApiController
    {
        static QuotationWorkFlowDAL QuotationWorkFlowdb = new QuotationWorkFlowDAL();

        [HttpPost]
        public void Post(QuotationWorkFlowModels QuotationWorkFlowModel)
        {
            QuotationWorkFlowdb.InsertData(QuotationWorkFlowModel);
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpPut]
        public int Put(QuotationWorkFlowModels QuotationWorkFlowModel)
        {
            var response = QuotationWorkFlowdb.UpdateData(QuotationWorkFlowModel);
            return response;
        }

        //[HttpDelete]
        //public int Delete(QuotationWorkFlowModels QuotationWorkFlowModel)
        //{
        //    var response = QuotationWorkFlowdb.DeleteData(QuotationWorkFlowModel);
        //    return response;
        //}
    }
}
