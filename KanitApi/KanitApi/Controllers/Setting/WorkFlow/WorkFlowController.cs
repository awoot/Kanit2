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
    public class WorkFlowController : ApiController
    {
        static WorkFlowDAL WorkFlowdb = new WorkFlowDAL();

        [HttpGet]
        public string Get()
        {
            var response = WorkFlowdb.SelectData();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        public string Get(int id)
        {
            var response = WorkFlowdb.SelectByID(id);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpPost]
        public void Post(WorkFlowModels WorkFlowModel)
        {
            WorkFlowdb.InsertData(WorkFlowModel);
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpPut]
        public int Put(WorkFlowModels WorkFlowModel)
        {
            var response = WorkFlowdb.UpdateData(WorkFlowModel);
            return response;
        }

        [HttpDelete]
        public int Delete(WorkFlowModels WorkFlowModel)
        {
            var response = WorkFlowdb.DeleteData(WorkFlowModel);
            return response;
        }
    }
}
