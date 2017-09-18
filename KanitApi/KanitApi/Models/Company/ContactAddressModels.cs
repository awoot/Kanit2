using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace KanitApi.Models.Company
{
    public class ContactAddressModels
    {
        public int ID { get; set; }

        public int ContactID { get; set; }

        public string Address { get; set; }

        public int Province { get; set; }

        public int Amphur { get; set; }

        public int Tambon { get; set; }

        public string PostCode { get; set; }

        public int CreateBy { get; set; }

        public int EditBy { get; set; }
    }
}