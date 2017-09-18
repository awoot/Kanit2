using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace KanitApi.Models.Company
{
    public class CompanyModels
    {
        public int ID { get; set; }

        public string CompanyCode { get; set; }

        public string CompanyNameTH { get; set; }

        public string CompanyNameEN { get; set; }

        public int CompanyTypeID { get; set; }

        public int CustSegment { get; set; }

        public int Validity { get; set; }

        public int PaymentTypeID { get; set; }

        public int CreditTerm { get; set; }

        public decimal CreditLimit { get; set; }

        public string ParentCompany { get; set; }

        public string KeyAccountSR { get; set; }

        public int CreateBy { get; set; }

        public int EditBy { get; set; }
    }
}