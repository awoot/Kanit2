﻿using KanitApi.Models;
using KanitApi.ObjectData;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Web;

namespace KanitApi.Providers
{
    public class CommonProvider
    {
        private static CommonProvider _instance;

        public static CommonProvider Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new CommonProvider();
                }

                return _instance;
            }
        }


        string conStr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

        public UserObjectData GetUser(string email)
        {
            UserObjectData result = null;

            using (var conn = new SqlConnection(conStr))
            using (var comm = conn.CreateCommand())
            {
                if (conn.State == ConnectionState.Closed) conn.Open();

                comm.CommandType = CommandType.StoredProcedure;
                comm.CommandText = "uspGetUserByEmail";
                comm.Parameters.AddWithValue("@email", email);

                using (var read = comm.ExecuteReader())
                {
                    while (read.Read())
                    {
                        result = new UserObjectData
                        {
                            ID = read["ID"].ForceToInt32(),
                            UserName = read["UserName"].ForceToString(),
                            FirstName = read["FirstName"].ForceToString(),
                            LastName = read["LastName"].ForceToString(),
                            Department = read["Department"].ForceToString(),
                            Position = read["Position"].ForceToString(),
                            Company = read["Company"].ForceToString(),
                            Email = read["Email"].ForceToString(),
                            SecurityID = read["SecurityID"].ForceToString(),
                            CreateDate = read["CreateDate"].ForceToDate(),
                            CreateBy = read["CreateBy"].ForceToInt32(),
                            EditDate = read["EditDate"].ForceToDateNull(),
                            EditBy = read["EditBy"].ForceToInt32(),
                        };
                    }

                }
            }

            return result;
        }

        private EmailTemplateObjectData GetEmailTemplate(string title)
        {
            EmailTemplateObjectData result = null;

            using (var conn = new SqlConnection(conStr))
            using (var comm = conn.CreateCommand())
            {
                if (conn.State == ConnectionState.Closed) conn.Open();

                comm.CommandType = CommandType.StoredProcedure;
                comm.CommandText = "uspGetEmailTemplate";
                comm.Parameters.AddWithValue("@title", title);

                using (var read = comm.ExecuteReader())
                {
                    while (read.Read())
                    {
                        result = new EmailTemplateObjectData
                        {
                            Title = read["Title"].ForceToString(),
                            Subject = read["Subject"].ForceToString(),
                            Template = read["Template"].ForceToString(),
                            ContentData = read["ContentData"].ForceToString(),
                            ContentData2 = read["ContentData2"].ForceToString(),
                            ContentData3 = read["ContentData3"].ForceToString(),
                            ContentData4 = read["ContentData4"].ForceToString(),
                            ContentData5 = read["ContentData5"].ForceToString()
                        };
                    }
                }
            }

            if (result == null) throw new Exception("can not find email template " + title);

            return result;
        }

        public void SendEmail(string from, string to, string cc, string bcc, string emailTitle, Dictionary<string, string> content)
        {
            var emailTemplate = GetEmailTemplate(emailTitle);

            var subject = emailTemplate.Subject;
            var body = emailTemplate.Template;

            var contentData = new List<string>();
            contentData.Add(emailTemplate.ContentData);
            contentData.Add(emailTemplate.ContentData2);
            contentData.Add(emailTemplate.ContentData3);
            contentData.Add(emailTemplate.ContentData4);
            contentData.Add(emailTemplate.ContentData5);

            foreach (var data in content)
            {
                subject = subject.Replace("[" + data.Key + "]", data.Value);
                contentData[0] = contentData[0].Replace("[" + data.Key + "]", data.Value);
                contentData[1] = contentData[1].Replace("[" + data.Key + "]", data.Value);
                contentData[2] = contentData[2].Replace("[" + data.Key + "]", data.Value);
                contentData[3] = contentData[3].Replace("[" + data.Key + "]", data.Value);
                contentData[4] = contentData[4].Replace("[" + data.Key + "]", data.Value);
            }

            body = body.Replace("[ContentData]", contentData[0]);
            body = body.Replace("[ContentData2]", contentData[1]);
            body = body.Replace("[ContentData3]", contentData[2]);
            body = body.Replace("[ContentData4]", contentData[3]);
            body = body.Replace("[ContentData5]", contentData[4]);

            SendEmail(from, to, cc, bcc, subject, body);
        }

        public void SendEmail(string from, string to, string cc, string bcc, string subject, string body)
        {
            // Command line argument must the the SMTP host.
            var client = new SmtpClient();
            client.Port = 587;
            client.Host = "smtp.gmail.com";
            client.EnableSsl = true;
            client.Timeout = 10000;
            client.Credentials = new System.Net.NetworkCredential("awoot.r@gmail.com", "weng4525016");

            var mm = new MailMessage();
            mm.From = new MailAddress(from);

            if (to != null)
            {
                foreach (var m in to.Split(';'))
                {
                    if (string.IsNullOrEmpty(m)) continue;

                    mm.To.Add(new MailAddress(m));
                }
            }

            if (cc != null)
            {
                foreach (var m in cc.Split(';'))
                {
                    if (string.IsNullOrEmpty(m)) continue;

                    mm.To.Add(new MailAddress(m));
                }
            }

            if (bcc != null)
            {
                foreach (var m in bcc.Split(';'))
                {
                    if (string.IsNullOrEmpty(m)) continue;

                    mm.To.Add(new MailAddress(m));
                }
            }

            mm.Subject = subject;
            mm.Body = body;
            mm.BodyEncoding = UTF8Encoding.UTF8;
            mm.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;
            mm.IsBodyHtml = true;

            client.Send(mm);
        }

        public DataSet Dashboard(int userID)
        {
            var ds = new DataSet();
            using (var conn = new SqlConnection(conStr))
            using (var comm = conn.CreateCommand())
            using (var adp = new SqlDataAdapter(comm))
            {
                if (conn.State == ConnectionState.Closed) conn.Open();

                comm.CommandType = CommandType.StoredProcedure;
                comm.CommandText = "uspGetDashBoard";
                comm.Parameters.AddWithValue("@userID", userID);
                
                adp.Fill(ds);
            }

            return ds;
        }

        public int CurrentUserID
        {
            get
            {
                var ID = 0;
                if (HttpContext.Current.Session != null && HttpContext.Current.Session["CurrentUser"] != null)
                {
                    var row = HttpContext.Current.Session["CurrentUser"] as DataRow;

                    ID = row["ID"].ForceToInt32();
                }

                return ID;
            }
        }

        public void UpdateCostSheet(int quoteID, string costSheet, decimal cost1, decimal sellPrice)
        {
            using (var conn = new SqlConnection(conStr))
            using (var comm = conn.CreateCommand())
            using (var adp = new SqlDataAdapter(comm))
            {
                if (conn.State == ConnectionState.Closed) conn.Open();

                comm.CommandType = CommandType.StoredProcedure;
                comm.CommandText = "uspUpdateCostSheet";
                comm.Parameters.AddWithValue("@quoteID", quoteID);
                comm.Parameters.AddWithValue("@costSheet", costSheet);
                comm.Parameters.AddWithValue("@cost1", cost1);
                comm.Parameters.AddWithValue("@sellPrice", sellPrice);

                comm.ExecuteNonQuery();
            }
        }

        public void CreateQuotationHistory(int quoteID, int createdByUserID, string detail)
        {
            using (var conn = new SqlConnection(conStr))
            using (var comm = conn.CreateCommand())
            {
                if (conn.State == ConnectionState.Closed) conn.Open();

                comm.CommandType = CommandType.StoredProcedure;
                comm.CommandText = "uspCreateQuotationHistory";

                comm.Parameters.AddWithValue("@quoteID", quoteID);
                comm.Parameters.AddWithValue("@createdByUserID", createdByUserID);
                comm.Parameters.AddWithValue("@detail", detail);

                comm.ExecuteNonQuery();
            }
        }

        public DataSet Monitoring(int userID, DateTime fromDate, DateTime toDate)
        {
            var ds = new DataSet();
            using (var conn = new SqlConnection(conStr))
            using (var comm = conn.CreateCommand())
            using (var adp = new SqlDataAdapter(comm))
            {
                if (conn.State == ConnectionState.Closed) conn.Open();

                comm.CommandType = CommandType.StoredProcedure;
                comm.CommandText = "uspGetMonitoring";

                comm.Parameters.AddWithValue("@userID", userID);
                comm.Parameters.AddWithValue("@fromDate", fromDate);
                comm.Parameters.AddWithValue("@toDate", toDate);

                adp.Fill(ds);
            }

            return ds;
        }
    }
}