using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using KanitApi.DAL.Setting.Announce;
using KanitApi.Models.Setting.Announce;
using System.Data;
using System.Json;
using Newtonsoft.Json;
using System.Web.Http.Cors;

namespace KanitApi.Controllers.Setting.Announce
{
    [EnableCorsAttribute("*", "*", "*")]
    public class AnnounceController : ApiController
    {
        static AnnounceDAL Announcedb = new AnnounceDAL();
        [HttpGet]
        //GetAll เพื่อแสดงlist ใช้หน้า IndexExpense Master
        public string Get()
        {
            var response = Announcedb.SelectData();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        //GetจากID เพื่อ Edit ใช้หน้า Expense Master
        public string Get(int id)
        {
            var response = Announcedb.SelectByID(id);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpPost]
        public void Post(AnnounceModels AnnounceModel)
        {
            Announcedb.InsertData(AnnounceModel);
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpPut]
        public int Put(AnnounceModels AnnounceModel)
        {
            var response = Announcedb.UpdateData(AnnounceModel);
            return response;
        }

        [HttpDelete]
        public int Delete(AnnounceModels AnnounceModel)
        {
            var response = Announcedb.DeleteData(AnnounceModel);
            return response;
        }

        [HttpGet]
        //GetAll เพื่อแสดงlist ใช้หน้า IndexExpense Master
        public string Notification(string i)
        {
            var response = Announcedb.Notification();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }
    }
}
