using KanitApi.Models;
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
        private static CommonProvider  _instance;

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
                    result = new UserObjectData
                    {
                        ID = read["Title"].ForceToInt32(),
                        UserName = read["Subject"].ForceToString(),
                        FirstName = read["Template"].ForceToString(),
                        LastName = read["ContentData"].ForceToString(),
                        Department = read["ContentData2"].ForceToString(),
                        Position = read["ContentData3"].ForceToString(),
                        Company = read["ContentData4"].ForceToString(),
                        Email = read["ContentData5"].ForceToString(),
                        SecurityID = read["ContentData5"].ForceToString(),
                        CreateDate = read["ContentData5"].ForceToDate(),
                        CreateBy = read["ContentData5"].ForceToInt32(),
                        EditDate = read["ContentData5"].ForceToDateNull(),
                        EditBy = read["ContentData5"].ForceToInt32(),
                    };
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

                for (var i = 0; i < contentData.Count; i++)
                {
                    var item = contentData[i];
                    item = item.Replace("[" + data.Key + "]", data.Value);
                }
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
            SmtpClient client = new SmtpClient();
            client.Port = 587;
            client.Host = "smtp.gmail.com";
            client.EnableSsl = true;
            client.Timeout = 10000;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;
            client.Credentials = new System.Net.NetworkCredential("user@gmail.com", "password");

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

            mm.BodyEncoding = UTF8Encoding.UTF8;
            mm.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;
            mm.IsBodyHtml = true;

            client.Send(mm);
        }
    }
}