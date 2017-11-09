using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KanitApi.Models.Setting.Announce
{
    public class AnnounceModels
    {
        public int ID { get; set; }
        public int AnnounceTypeID { get; set; }
        public string Description { get; set; }
        public DateTime WarningDate { get; set; }
        public DateTime WarningDateTo { get; set; }
        public int CreateBy { get; set; }
        public int EditBy { get; set; }
    }
}