using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using KanitApi.Models.Setting.User;
using System;

namespace KanitApi.DAL.Setting.User
{
    public class UserDAL
    {
        string conStr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        int result = 0;
        public void InsertData(UserModels UserModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_User_Ins", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserName", UserModel.UserName);
                    cmd.Parameters.AddWithValue("@Password", UserModel.Password);
                    cmd.Parameters.AddWithValue("@FirstName", UserModel.FirstName);
                    cmd.Parameters.AddWithValue("@LastName", UserModel.LastName);
                    cmd.Parameters.AddWithValue("@Department", UserModel.Department);
                    cmd.Parameters.AddWithValue("@Position", UserModel.Position);
                    cmd.Parameters.AddWithValue("@Company", UserModel.Company);
                    cmd.Parameters.AddWithValue("@Email", UserModel.Email);
                    cmd.Parameters.AddWithValue("@SecurityID", UserModel.SecurityID);
                    cmd.Parameters.AddWithValue("@CreateBy", UserModel.CreateBy);
                    cmd.Parameters.AddWithValue("@EditBy", UserModel.EditBy);
                    conObj.Open();
                    cmd.ExecuteNonQuery();
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

        public int UpdateData(UserModels UserModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_User_Upd", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", UserModel.ID);
                    cmd.Parameters.AddWithValue("@UserName", UserModel.UserName);
                    cmd.Parameters.AddWithValue("@Password", UserModel.Password);
                    cmd.Parameters.AddWithValue("@FirstName", UserModel.FirstName);
                    cmd.Parameters.AddWithValue("@LastName", UserModel.LastName);
                    cmd.Parameters.AddWithValue("@Department", UserModel.Department);
                    cmd.Parameters.AddWithValue("@Position", UserModel.Position);
                    cmd.Parameters.AddWithValue("@Company", UserModel.Company);
                    cmd.Parameters.AddWithValue("@Email", UserModel.Email);
                    cmd.Parameters.AddWithValue("@SecurityID", UserModel.SecurityID);
                    cmd.Parameters.AddWithValue("@EditBy", UserModel.EditBy);
                    conObj.Open();
                    result = cmd.ExecuteNonQuery();
                    return result;
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

        public int DeleteData(UserModels UserModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_User_Del", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", UserModel.ID);
                    cmd.Parameters.AddWithValue("@EditBy", UserModel.EditBy);
                    conObj.Open();
                    result = cmd.ExecuteNonQuery();
                    return result;
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

        public DataSet SelectByID(int id)
        {
            DataSet ds = null;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_User_SelByID", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", id); // 
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
        public DataSet SelectData()
        {
            DataSet ds = null;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_User_Sel", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
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
    }
}