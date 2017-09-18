using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using KanitApi.Models.Company;
using System;

namespace KanitApi.DAL.Company
{
    public class AddressDAL
    {
        string conStr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        int result = 0;
        public int InsertData(AddressModels AddressModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_Address_Ins", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@CompID", AddressModel.CompID);
                    cmd.Parameters.AddWithValue("@TaxID", AddressModel.TaxID != null ? AddressModel.TaxID : "");
                    cmd.Parameters.AddWithValue("@Branch", AddressModel.Branch != null ? AddressModel.Branch : "");
                    cmd.Parameters.AddWithValue("@Address", AddressModel.Address);
                    cmd.Parameters.AddWithValue("@Province", AddressModel.Province);
                    cmd.Parameters.AddWithValue("@Amphur", AddressModel.Amphur);
                    cmd.Parameters.AddWithValue("@Tambon", AddressModel.Tambon);
                    cmd.Parameters.AddWithValue("@PostCode", AddressModel.PostCode != null ? AddressModel.PostCode : "");
                    cmd.Parameters.AddWithValue("@TelNo", AddressModel.TelNo != null ? AddressModel.TelNo : "");
                    cmd.Parameters.AddWithValue("@TelExt", AddressModel.TelExt != null ? AddressModel.TelExt : "");
                    cmd.Parameters.AddWithValue("@MobileNo", AddressModel.MobileNo != null ? AddressModel.MobileNo : "");
                    cmd.Parameters.AddWithValue("@FaxNo", AddressModel.FaxNo != null ? AddressModel.FaxNo : "");
                    cmd.Parameters.AddWithValue("@AddressTypeID", AddressModel.AddressTypeID);
                    cmd.Parameters.AddWithValue("@IsPrimary", AddressModel.IsPrimary);
                    cmd.Parameters.AddWithValue("@CreateBy", AddressModel.CreateBy);
                    cmd.Parameters.AddWithValue("@EditBy", AddressModel.EditBy);
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

        public int UpdateData(AddressModels AddressModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_Address_Upd", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", AddressModel.ID);
                    cmd.Parameters.AddWithValue("@TaxID", AddressModel.TaxID != null ? AddressModel.TaxID : "");
                    cmd.Parameters.AddWithValue("@Branch", AddressModel.Branch != null ? AddressModel.Branch : "");
                    cmd.Parameters.AddWithValue("@Address", AddressModel.Address);
                    cmd.Parameters.AddWithValue("@Province", AddressModel.Province);
                    cmd.Parameters.AddWithValue("@Amphur", AddressModel.Amphur);
                    cmd.Parameters.AddWithValue("@Tambon", AddressModel.Tambon);
                    cmd.Parameters.AddWithValue("@PostCode", AddressModel.PostCode != null ? AddressModel.PostCode : "");
                    cmd.Parameters.AddWithValue("@TelNo", AddressModel.TelNo != null ? AddressModel.TelNo : "");
                    cmd.Parameters.AddWithValue("@TelExt", AddressModel.TelExt != null ? AddressModel.TelExt : "");
                    cmd.Parameters.AddWithValue("@MobileNo", AddressModel.MobileNo != null ? AddressModel.MobileNo : "");
                    cmd.Parameters.AddWithValue("@FaxNo", AddressModel.FaxNo != null ? AddressModel.FaxNo : "");
                    cmd.Parameters.AddWithValue("@AddressTypeID", AddressModel.AddressTypeID);
                    cmd.Parameters.AddWithValue("@IsPrimary", AddressModel.IsPrimary);
                    cmd.Parameters.AddWithValue("@EditBy", AddressModel.EditBy);
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

        public int DeleteData(AddressModels AddressModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_Address_Del", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", AddressModel.ID);
                    cmd.Parameters.AddWithValue("@EditBy", AddressModel.EditBy);
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
                    SqlCommand cmd = new SqlCommand("SP_Address_SelByID", conObj);
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