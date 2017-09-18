using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace KanitApi.Models.Sell.Quotation
{
    public class QuotationDetailModels
    {
        public int ID { get; set; }
        public int QuoteID { get; set; }
        public int ProductID { get; set; }
        public int LineNum { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public int Unit { get; set; }
        public decimal UnitPrice { get; set; }
        public int Currency { get; set; }
        public decimal Amount { get; set; }
        public int CreateBy { get; set; }
        public int EditBy { get; set; }
    }
}