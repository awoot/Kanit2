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
using System.IO;

namespace KanitApi.Controllers.Sell.Quotation
{
    [EnableCorsAttribute("*", "*", "*")]
    public class QuotationWorkFlowActionController : ApiController
    {
        QuotationWorkFlowDAL QuotationWorkFlow = new QuotationWorkFlowDAL();

        [HttpPost]
        public void Post(QuotationWorkFlowActionModels QuotationWorkFlowAction)
        {
            QuotationWorkFlow.Action(QuotationWorkFlowAction);
        }
    }
}
