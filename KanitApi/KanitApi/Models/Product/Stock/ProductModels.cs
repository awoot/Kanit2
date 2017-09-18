using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace KanitApi.Models.Product.Stock
{
    public class ProductModels
    {
        public int ID { get; set; }

        public string OrdNumber { get; set; }

        public string ProductCode { get; set; }
        public string ProductDetail { get; set; }

        public int Unit { get; set; }

        public int Remain { get; set; }

        public decimal StandardCost { get; set; }

        public decimal SellingPrice { get; set; }

        public int WarningStock { get; set; }

        public int CreateBy { get; set; }

        public int EditBy { get; set; }
    }
}