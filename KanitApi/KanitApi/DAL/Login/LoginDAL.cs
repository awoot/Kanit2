using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using KanitApi.Models.Setting.User;
using System;
using KanitApi.Providers;
using System.Collections.Generic;

namespace KanitApi.DAL.Login
{
    public class LoginDAL
    {
        string conStr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        int result = 0;

        public DataSet Authenticate(string userName, string password)
        {
            DataSet ds = null;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_UserLogin", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserName", userName);
                    cmd.Parameters.AddWithValue("@Password", password);
                    conObj.Open();
                    SqlDataAdapter da = new SqlDataAdapter();
                    da.SelectCommand = cmd;
                    ds = new DataSet();
                    da.Fill(ds);

                    return ds;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    conObj.Close();
                }
            }
        }

        public void SendEmailResetPassword(string email)
        {
            var token = GenResetPasswordToken(email);
            var user = CommonProvider.Instance.GetUser(email);

            var from = ConfigurationManager.AppSettings["EmailFrom"];
            var to = email;

            var resetPassowrdURL = ConfigurationManager.AppSettings["ResetPassowrdURL"];

            var content = new Dictionary<string, string>();
            content.Add("FirstName", user.FirstName);
            content.Add("LastName", user.LastName);
            content.Add("UserName", user.UserName);
            content.Add("Email", user.Email);
            content.Add("ResetPasswordURL", resetPassowrdURL);

            CommonProvider.Instance.SendEmail(from, to, null, null, "RESET_PASSWORD", content);
        }

        private string GenResetPasswordToken(string email)
        {
            var token = string.Empty;

            using (var conn = new SqlConnection(conStr))
            using (var comm = conn.CreateCommand())
            {
                if (conn.State == ConnectionState.Closed) conn.Open();

                comm.CommandType = CommandType.StoredProcedure;
                comm.CommandText = "uspGenResetPasswordToken";
                comm.Parameters.AddWithValue("@email", email);
                comm.Parameters.AddWithValue("@token", token);

                comm.Parameters["@token"].Direction = ParameterDirection.Output;

                comm.ExecuteNonQuery();

                token = comm.Parameters["@token"].Value.ForceToString();
            }

            if (string.IsNullOrEmpty(token))
            {
                throw new Exception("can GenResetPasswordToken");
            }

            return token;
        }
    }
}