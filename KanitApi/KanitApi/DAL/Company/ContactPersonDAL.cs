using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using KanitApi.Models.Company;
using System;

namespace KanitApi.DAL.Company
{
    public class ContactPersonDAL
    {
        string conStr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        int result = 0;
        public int InsertData(ContactPersonModels ContactPersonModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_ContactPerson_Ins", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@CompID", ContactPersonModel.CompID);
                    cmd.Parameters.AddWithValue("@Salutation", ContactPersonModel.Salutation);
                    cmd.Parameters.AddWithValue("@FirstNameTH", ContactPersonModel.FirstNameTH);
                    cmd.Parameters.AddWithValue("@LastNameTH", ContactPersonModel.LastNameTH);
                    cmd.Parameters.AddWithValue("@FirstNameEN", ContactPersonModel.FirstNameEN);
                    cmd.Parameters.AddWithValue("@LastNameEN", ContactPersonModel.LastNameEN);
                    cmd.Parameters.AddWithValue("@MobileNo", ContactPersonModel.MobileNo);
                    cmd.Parameters.AddWithValue("@Email", ContactPersonModel.Email);
                    cmd.Parameters.AddWithValue("@EmailLetters", ContactPersonModel.EmailLetters);
                    cmd.Parameters.AddWithValue("@Position", ContactPersonModel.Position);
                    cmd.Parameters.AddWithValue("@CreateBy", ContactPersonModel.CreateBy);
                    cmd.Parameters.AddWithValue("@EditBy", ContactPersonModel.EditBy);
                    conObj.Open();
                    object obj = cmd.ExecuteScalar();
                    result = Convert.ToInt32(obj);
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

        public int UpdateData(ContactPersonModels ContactPersonModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_ContactPerson_Upd", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", ContactPersonModel.ID);
                    cmd.Parameters.AddWithValue("@Salutation", ContactPersonModel.Salutation);
                    cmd.Parameters.AddWithValue("@FirstNameTH", ContactPersonModel.FirstNameTH);
                    cmd.Parameters.AddWithValue("@LastNameTH", ContactPersonModel.LastNameTH);
                    cmd.Parameters.AddWithValue("@FirstNameEN", ContactPersonModel.FirstNameEN);
                    cmd.Parameters.AddWithValue("@LastNameEN", ContactPersonModel.LastNameEN);
                    cmd.Parameters.AddWithValue("@MobileNo", ContactPersonModel.MobileNo);
                    cmd.Parameters.AddWithValue("@Email", ContactPersonModel.Email);
                    cmd.Parameters.AddWithValue("@EmailLetters", ContactPersonModel.EmailLetters);
                    cmd.Parameters.AddWithValue("@Position", ContactPersonModel.Position);
                    cmd.Parameters.AddWithValue("@EditBy", ContactPersonModel.EditBy);
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

        public int DeleteData(ContactPersonModels ContactPersonModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_ContactPerson_Del", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", ContactPersonModel.ID);
                    cmd.Parameters.AddWithValue("@EditBy", ContactPersonModel.EditBy);
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
                    SqlCommand cmd = new SqlCommand("SP_ContactPerson_SelByID", conObj);
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
    }
}