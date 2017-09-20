using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using KanitApi.DAL.Setting.WorkFlow;
using KanitApi.Models.Setting.WorkFlow;
using System.Data;
using System.Json;
using Newtonsoft.Json;
using System.Web.Http.Cors;

namespace KanitApi.Controllers.Setting.WorkFlow
{
    [EnableCorsAttribute("*", "*", "*")]
    public class WorkFlowDetailController : ApiController
    {
        static WorkFlowDetailDAL WorkFlowDetaildb = new WorkFlowDetailDAL();

        [HttpGet]
        public string Get()
        {
            var response = WorkFlowDetaildb.SelectData();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        public string Get(int id)
        {
            var response = WorkFlowDetaildb.SelectByID(id);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpPost]
        public int Post(WorkFlowDetailModels WorkFlowDetailModel)
        {
            var response = WorkFlowDetaildb.InsertData(WorkFlowDetailModel);
            return response;
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpPut]
        public int Put(WorkFlowDetailModels WorkFlowDetailModel)
        {
            var response = WorkFlowDetaildb.UpdateData(WorkFlowDetailModel);
            return response;
        }

        [HttpDelete]
        public int Delete(WorkFlowDetailModels WorkFlowDetailModel)
        {
            var response = WorkFlowDetaildb.DeleteData(WorkFlowDetailModel);
            return response;
        }
    }
}
