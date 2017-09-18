using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using KanitApi.DAL.Setting.ExchangeRate;
using KanitApi.Models.Setting.ExchangeRate;
using System.Data;
using System.Json;
using Newtonsoft.Json;
using System.Web.Http.Cors;


namespace KanitApi.Controllers.Setting.ExchangeRate
{
    [EnableCorsAttribute("*", "*", "*")]
    public class ExchangeRateController : ApiController
    {
        static ExchangeRateDAL ExchangeRatedb = new ExchangeRateDAL();

        [HttpGet]
        //GetAll เพื่อแสดงlist ใช้หน้า IndexExpense Master
        public string Get()
        {
            var response = ExchangeRatedb.SelectData();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        //GetจากID เพื่อ Edit ใช้หน้า Expense Master
        public string Get(int id)
        {
            var response = ExchangeRatedb.SelectByID(id);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpPost]
        public void Post(ExchangeRateModels ExchangeRateModel)
        {
            ExchangeRatedb.InsertData(ExchangeRateModel);
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpPut]
        public int Put(ExchangeRateModels ExchangeRateModel)
        {
            var response = ExchangeRatedb.UpdateData(ExchangeRateModel);
            return response;
        }

        [HttpDelete]
        public int Delete(ExchangeRateModels ExchangeRateModel)
        {
            var response = ExchangeRatedb.DeleteData(ExchangeRateModel);
            return response;
        }
    }
}
