using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace KanitApi.Models.Sell.Quotation
{
    public class QuotationModels
    {
        public string Action { get; set; }
        public int ID { get; set; }
        public string QuotationNo { get; set; }
        public string Ref { get; set; }
        public string IncoDetail { get; set; }
        public string FileData { get; set; }
        public string CostSheet { get; set; }
        public string Reason { get; set; }
        public string Remark { get; set; }
        public DateTime QuotationDate { get; set; }
        public DateTime WarningDate { get; set; }
        public double Discount { get; set; }
        public int CompID { get; set; }
        public int Validity { get; set; }
        public int DeliveryTime { get; set; }
        public int PaymentTerm { get; set; }
        public int Seller { get; set; }
        public int State { get; set; }
        public int IncoTerm { get; set; }
        public int Vat { get; set; }
        public int Docver { get; set; }
        public int CreateBy { get; set; }
        public int EditBy { get; set; }

        public int Currency { get; set; }
        public List<QuotationDetailModels> Detail { get; set; }
        
    }
}