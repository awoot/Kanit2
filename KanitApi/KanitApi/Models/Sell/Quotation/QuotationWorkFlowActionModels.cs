using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KanitApi.Models.Sell.Quotation
{
    public class QuotationWorkFlowActionModels
    {
        public int QuotationID { get; set; }
        public int Step { get; set; }
        public int QuotationWorkFlowID { get; set; }
        public string Action { get; set; }
        public int ActionBy { get; set; }
        public string Reason { get; set; }
    }
}