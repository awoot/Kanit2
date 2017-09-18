using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace KanitApi.Models.Setting.WorkFlow
{
    public class WorkFlowModels
    {
        public int ID { get; set; }

        public string FlowName { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public string FlowDetail { get; set; }
        public string Remark { get; set; }

        public int CreateBy { get; set; }

        public int EditBy { get; set; }
    }
}