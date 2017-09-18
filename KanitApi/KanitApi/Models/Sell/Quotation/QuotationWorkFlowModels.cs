using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace KanitApi.Models.Sell.Quotation
{
    public class QuotationWorkFlowModels
    {
        public int ID { get; set; }
        public int QuoteID { get; set; }
        public int WorkFlowID { get; set; }
        public int Step1 { get; set; }
        public int Step2 { get; set; }
        public int Step3 { get; set; }
        public int Step4 { get; set; }
        public int Step5 { get; set; }
        public int Step6 { get; set; }
        public string ActionStep1 { get; set; }
        public string ActionStep2 { get; set; }
        public string ActionStep3 { get; set; }
        public string ActionStep4 { get; set; }
        public string ActionStep5 { get; set; }
        public string ActionStep6 { get; set; }
        public DateTime ActDate1 { get; set; }
        public DateTime ActDate2 { get; set; }
        public DateTime ActDate3 { get; set; }
        public DateTime ActDate4 { get; set; }
        public DateTime ActDate5 { get; set; }
        public DateTime ActDate6 { get; set; }
        public int ActOn1 { get; set; }
        public int ActOn2 { get; set; }
        public int ActOn3 { get; set; }
        public int ActOn4 { get; set; }
        public int ActOn5 { get; set; }
        public int ActOn6 { get; set; }

    }
}