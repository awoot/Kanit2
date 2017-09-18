using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace KanitApi.Models.Setting.SecurityProfile
{
    public class SecurityProfileDetailModels
    {
        public int ID { get; set; }

        public int SecurityID { get; set; }

        public string IsView { get; set; }

        public string IsInsert { get; set; }

        public string IsUpdate { get; set; }

        public string IsDelete { get; set; }

        public int MenuID { get; set; }

        public int CreateBy { get; set; }

        public int EditBy { get; set; }

    }
}