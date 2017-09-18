using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace KanitApi.Models.Setting.WorkFlow
{
    public class WorkFlowDetailModels
    {
        public int ID { get; set; }
        public int WorkFlowID { get; set; }
        public int Col_val { get; set; }
        public int Equation_val { get; set; }
        public decimal Cond_val1 { get; set; }
        public decimal Cond_val2 { get; set; }
        public int Stap1 { get; set; }
        public int Stap2 { get; set; }
        public int Stap3 { get; set; }
        public int Stap4 { get; set; }
        public int Stap5 { get; set; }
        public int Stap6 { get; set; }
        public int CreateBy { get; set; }

        public int EditBy { get; set; }
    }
}