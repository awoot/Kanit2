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
using KanitApi.Providers;
using KanitApi.DAL.Product.Stock;
using System.Web;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;

namespace KanitApi.Controllers
{
    [EnableCorsAttribute("*", "*", "*")]
    public class CommonController : ApiController
    {
        [HttpGet]
        public string InfoDashboard()
        {
            var response = CommonProvider.Instance.GetInfoDashboard();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpGet]
        public string Search(string type, string keyword)
        {
            object response = null;

            switch (type.Trim().ToUpper())
            {
                case "PRODUCT":
                    {
                        response = (new ProductDAL()).Search(keyword);
                    }
                    break;
            }

            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpPost]
        public string UploadFile()
        {
            HttpResponseMessage result = null;

            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count > 0)
            {
                var docfiles = new List<string>();
                foreach (string file in httpRequest.Files)
                {
                    var postedFile = httpRequest.Files[file];

                    using (var doc = SpreadsheetDocument.Open(postedFile.InputStream, false))
                    {
                        WorkbookPart workbookPart = doc.WorkbookPart;
                        SharedStringTablePart sstpart = workbookPart.GetPartsOfType<SharedStringTablePart>().First();
                        SharedStringTable sst = sstpart.SharedStringTable;

                        WorksheetPart worksheetPart = workbookPart.WorksheetParts.First();
                        Worksheet sheet = worksheetPart.Worksheet;

                        var cells = sheet.Descendants<Cell>();
                        var rows = sheet.Descendants<Row>();

                    }

                    var filePath = HttpContext.Current.Server.MapPath("~/" + postedFile.FileName);
                    postedFile.SaveAs(filePath);

                    docfiles.Add(filePath);
                }
                result = Request.CreateResponse(HttpStatusCode.Created, docfiles);
            }
            else
            {
                result = Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            return "";
            //return JsonConvert.SerializeObject(response, Formatting.Indented);
        }
    }
}
