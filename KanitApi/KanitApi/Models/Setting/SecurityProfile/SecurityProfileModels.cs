using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace KanitApi.Models.Setting.SecurityProfile
{
    public class SecurityProfileModels
    {
        public int ID { get; set; }

        public string Profile { get; set; }

        public int MenuID { get; set; }

        public int MenuDetailID { get; set; }

        public int CreateBy { get; set; }

        public int EditBy { get; set; }

    }
}