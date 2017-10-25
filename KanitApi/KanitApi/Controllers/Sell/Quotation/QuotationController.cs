using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using KanitApi.DAL.Sell.Quotation;
using KanitApi.Models.Sell.Quotation;
using System.Data;
using System.Json;
using Newtonsoft.Json;
using System.Web.Http.Cors;
using System.IO;

namespace KanitApi.Controllers.Sell.Quotation
{
    [EnableCorsAttribute("*", "*", "*")]
    public class QuotationController : ApiController
    {
        static QuotationDAL Quotationdb = new QuotationDAL();

        [HttpGet]
        public string Get()
        {
            var response = Quotationdb.SelectData();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        public string Get(int id)
        {
            var response = Quotationdb.SelectByID(id);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpGet]
        public string Get(bool isLastVersion)
        {
            DataSet ds = new DataSet();

            if (isLastVersion)
            {
                ds = Quotationdb.SelectData();
            }
            else
            {
                ds = Quotationdb.SelectByLastVersion();
            }

            return JsonConvert.SerializeObject(ds, Formatting.Indented);
        }
        [HttpPost]
        public int Post(QuotationModels QuotationModel)
        {
            //if (QuotationModel.FileData != null)
            //{
            //    byte[] AttachData = Convert.FromBase64String(QuotationModel.FileData);
            //    string path;
            //    string ImgName;
            //    ImgName = PD.Img;
            //    string[] str = ImgName.Split('/');
            //    path = System.Web.HttpContext.Current.Server.MapPath(QuotationModel.CostSheet);
            //    File.WriteAllBytes(path, AttachData);
            //}
            var response = Quotationdb.InsertData(QuotationModel);
            return response;
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpPut]
        public int Put(QuotationModels QuotationModel)
        {
            var response = Quotationdb.UpdateData(QuotationModel);
            return response;
        }

        [HttpDelete]
        public int Delete(QuotationModels QuotationModel)
        {
            //if (QuotationModel.CostSheet != null || QuotationModel.CostSheet != "")
            //{
            //    string path;
            //    //string ImgName;
            //    //ImgName = PD.Img;
            //    //string[] str = ImgName.Split('/');
            //    path = System.Web.HttpContext.Current.Server.MapPath(QuotationModel.CostSheet);
            //    File.Delete(path);
            //}
            var response = Quotationdb.DeleteData(QuotationModel);
            return response;
        }
    }
}
