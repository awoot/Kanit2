using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using KanitApi.DAL.Product.Stock;
using KanitApi.Models.Product.Stock;
using System.Data;
using System.Json;
using Newtonsoft.Json;
using System.Web.Http.Cors;

namespace KanitApi.Controllers.Product.Stock
{
    [EnableCorsAttribute("*", "*", "*")]
    public class ProductController : ApiController
    {
        static ProductDAL Productdb = new ProductDAL();

        [HttpGet]
        public string Get()
        {
            var response = Productdb.SelectData();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        public string Get(int id)
        {
            var response = Productdb.SelectByID(id);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpPost]
        public void Post(ProductModels ProductModel)
        {
            Productdb.InsertData(ProductModel);
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpPut]
        public int Put(ProductModels ProductModel)
        {
            var response = Productdb.UpdateData(ProductModel);
            return response;
        }

        [HttpDelete]
        public int Delete(ProductModels ProductModel)
        {
            var response = Productdb.DeleteData(ProductModel);
            return response;
        }
    }
}
