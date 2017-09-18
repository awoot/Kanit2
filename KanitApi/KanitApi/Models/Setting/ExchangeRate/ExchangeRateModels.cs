using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace KanitApi.Models.Setting.ExchangeRate
{
    public class ExchangeRateModels
    {
        public int ID { get; set; }

        public int Currency { get; set; }

        public double Rate { get; set; }

        public DateTime UpdateDate { get; set; }

        public int CreateBy { get; set; }

        public int EditBy { get; set; }
    }
}