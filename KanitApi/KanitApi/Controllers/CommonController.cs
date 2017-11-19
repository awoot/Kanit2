﻿using System;
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
using System.IO;

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

            int quoteID = 0;
            decimal costPrice = 0;
            decimal sellingPrice = 0;
            string costSheet = "";

            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count > 0)
            {
                var docfiles = new List<string>();
                foreach (string file in httpRequest.Files)
                {
                    quoteID = httpRequest.Form["quoteID"].ForceToInt32();

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

                        foreach (Row row in rows.Skip(1))
                        {
                            costPrice += row.Elements<Cell>().ElementAt(9).CellValue.Text.ForceToDecimal();
                            sellingPrice += row.Elements<Cell>().ElementAt(10).CellValue.Text.ForceToDecimal();

                            foreach (Cell c in row.Elements<Cell>())
                            {
                                if ((c.DataType != null) && (c.DataType == CellValues.SharedString))
                                {
                                    int ssid = int.Parse(c.CellValue.Text);
                                    string str = sst.ChildElements[ssid].InnerText;
                                    Console.WriteLine("Shared string {0}: {1}", ssid, str);
                                }
                                else if (c.CellValue != null)
                                {
                                    Console.WriteLine("Cell contents: {0}", c.CellValue.Text);
                                }
                            }
                        }
                    }
                    var filename = postedFile.FileName.Substring(postedFile.FileName.LastIndexOf('\\') + 1);

                    costSheet = "~/CostSheet/" + quoteID;

                    var dirPart = HttpContext.Current.Server.MapPath(costSheet);

                    var filePath = dirPart + "/" + filename;

                    if (!Directory.Exists(dirPart))
                    {
                        Directory.CreateDirectory(dirPart);
                    }

                    postedFile.SaveAs(filePath);

                    costSheet = "http://" + HttpContext.Current.Request.Url.Authority + "/CostSheet/" + quoteID + "/" + filename;
                    //docfiles.Add(filePath);
                }

            }

            CommonProvider.Instance.UpdateCostSheet(quoteID, costSheet, costPrice, sellingPrice);

            var tmp = string.Format("{{\"CostSheet\":\"{0}\", \"Cost1\":\"{1}\", \"SellPrice\":\"{2}\"}}", costSheet, costPrice, sellingPrice);

            return tmp;
            //return JsonConvert.SerializeObject(response, Formatting.Indented);
        }
    }
}
