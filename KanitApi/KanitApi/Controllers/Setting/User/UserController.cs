using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using KanitApi.DAL.Setting.User;
using KanitApi.Models.Setting.User;
using System.Data;
using System.Json;
using Newtonsoft.Json;
using System.Web.Http.Cors;

namespace KanitApi.Controllers.Setting.User
{
    [EnableCorsAttribute("*", "*", "*")]
    public class UserController : ApiController
    {
        static UserDAL Userdb = new UserDAL();

        [HttpGet]
        //GetAll เพื่อแสดงlist ใช้หน้า IndexExpense Master
        public string Get()
        {
            var response = Userdb.SelectData();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        //GetจากID เพื่อ Edit ใช้หน้า Expense Master
        public string Get(int id)
        {
            var response = Userdb.SelectByID(id);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpPost]
        public void Post(UserModels UserModel)
        {
            Userdb.InsertData(UserModel);
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpPut]
        public int Put(UserModels UserModel)
        {
            var response = Userdb.UpdateData(UserModel);
            return response;
        }

        [HttpDelete]
        public int Delete(UserModels UserModel)
        {
            var response = Userdb.DeleteData(UserModel);
            return response;
        }
    }
}
