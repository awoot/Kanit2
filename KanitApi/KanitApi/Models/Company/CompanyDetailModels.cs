using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KanitApi.Models.Company
{
    public class CompanyDetailModels
    {
        public int ID { get; set; }

        public int CompID { get; set; }

        public string IsSelect { get; set; }

        public int MasterID { get; set; }

        public int CreateBy { get; set; }

        public int EditBy { get; set; }
    }
}