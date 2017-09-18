using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using KanitApi.Models.Company;
using System;

namespace KanitApi.DAL.Company
{
    public class ContactAddressDAL
    {
        string conStr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        int result = 0;

        public int InsertData(ContactAddressModels ContactAddressModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_ContactAddress_Ins", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ContactID", ContactAddressModel.ContactID);
                    cmd.Parameters.AddWithValue("@Address", ContactAddressModel.Address);
                    cmd.Parameters.AddWithValue("@Province", ContactAddressModel.Province);
                    cmd.Parameters.AddWithValue("@Amphur", ContactAddressModel.Amphur);
                    cmd.Parameters.AddWithValue("@Tambon", ContactAddressModel.Tambon);
                    cmd.Parameters.AddWithValue("@PostCode", ContactAddressModel.PostCode != null ? ContactAddressModel.PostCode : "");
                    cmd.Parameters.AddWithValue("@CreateBy", ContactAddressModel.CreateBy);
                    cmd.Parameters.AddWithValue("@EditBy", ContactAddressModel.EditBy);
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

        public int UpdateData(ContactAddressModels ContactAddressModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_ContactAddress_Upd", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", ContactAddressModel.ID);
                    cmd.Parameters.AddWithValue("@Address", ContactAddressModel.Address);
                    cmd.Parameters.AddWithValue("@Province", ContactAddressModel.Province);
                    cmd.Parameters.AddWithValue("@Amphur", ContactAddressModel.Amphur);
                    cmd.Parameters.AddWithValue("@Tambon", ContactAddressModel.Tambon);
                    cmd.Parameters.AddWithValue("@PostCode", ContactAddressModel.PostCode != null ? ContactAddressModel.PostCode : "");
                    cmd.Parameters.AddWithValue("@EditBy", ContactAddressModel.EditBy);
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

        public int DeleteData(ContactAddressModels ContactAddressModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_ContactAddress_Del", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", ContactAddressModel.ID);
                    cmd.Parameters.AddWithValue("@EditBy", ContactAddressModel.EditBy);
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
                    SqlCommand cmd = new SqlCommand("SP_ContactAddress_SelByID", conObj);
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