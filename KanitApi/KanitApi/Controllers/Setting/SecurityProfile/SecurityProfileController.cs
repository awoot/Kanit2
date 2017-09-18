using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using KanitApi.DAL.Setting.SecurityProfile;
using KanitApi.Models.Setting.SecurityProfile;
using System.Data;
using System.Json;
using Newtonsoft.Json;
using System.Web.Http.Cors;


namespace KanitApi.Controllers.Setting.SecurityProfile
{
    [EnableCorsAttribute("*", "*", "*")]
    public class SecurityProfileController : ApiController
    {
        public SecurityProfileDAL securityProfile = new SecurityProfileDAL();
        [EnableCorsAttribute("*", "*", "*")]
        [HttpPost]
        public int Post(SecurityProfileModels securityProfileModel)
        {
            var response = securityProfile.InsertData(securityProfileModel);
            return response;
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        public string Get()
        {
            var response = securityProfile.SelectData();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        public string Get(int id)
        {
            var response = securityProfile.SelectByID(id);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpPut]
        public int Put(SecurityProfileModels securityProfileModel)
        {
            //calling DBData Class Method and storing Repsonse   
            var response = securityProfile.UpdateData(securityProfileModel);
            return response;

        }

        [HttpDelete]
        public string Delete(SecurityProfileModels securityProfileModel)
        {
            //calling DBData Class Method and storing Repsonse   
            var response = securityProfile.DeleteDetail(securityProfileModel);
            return response;

        }
    }
}
