using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace KanitApi.Models.Company
{
    public class AddressModels
    {
        public int ID { get; set; }

        public int CompID { get; set; }

        public string TaxID { get; set; }

        public string Branch { get; set; }

        public string Address { get; set; }

        public int Province { get; set; }

        public int Amphur { get; set; }

        public int Tambon { get; set; }

        public string PostCode { get; set; }

        public string TelNo { get; set; }

        public string TelExt { get; set; }

        public string MobileNo { get; set; }

        public string FaxNo { get; set; }

        public int AddressTypeID { get; set; }

        public string IsPrimary { get; set; }

        public int CreateBy { get; set; }

        public int EditBy { get; set; }
    }
}