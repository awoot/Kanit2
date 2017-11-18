using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KanitApi.Models.Company
{
    public class ContactPersonAddressModels
    {
        public int ContactPersonID { get; set; }
        public string Address { get; set; }
        public int Province { get; set; }
        public int Amphur { get; set; }
        public int Tambon { get; set; }
        public string PostCode { get; set; }
    }
}