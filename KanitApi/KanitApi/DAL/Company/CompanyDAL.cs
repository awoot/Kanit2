using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using KanitApi.Models.Company;
using System;

namespace KanitApi.DAL.Company
{
    public class CompanyDAL
    {
        string conStr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        int result = 0;
        public int InsertData(CompanyModels CompanyModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_Company_Ins", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@CompanyCode", CompanyModel.CompanyCode);
                    cmd.Parameters.AddWithValue("@CompanyNameTH", CompanyModel.CompanyNameTH);
                    cmd.Parameters.AddWithValue("@CompanyNameEN", CompanyModel.CompanyNameEN);
                    cmd.Parameters.AddWithValue("@CompanyTypeID", CompanyModel.CompanyTypeID);
                    cmd.Parameters.AddWithValue("@CustSegment", CompanyModel.CustSegment);
                    cmd.Parameters.AddWithValue("@Validity", CompanyModel.Validity);
                    cmd.Parameters.AddWithValue("@PaymentTypeID", CompanyModel.PaymentTypeID);
                    cmd.Parameters.AddWithValue("@CreditTerm", CompanyModel.CreditTerm);
                    cmd.Parameters.AddWithValue("@CreditLimit", CompanyModel.CreditLimit);
                    cmd.Parameters.AddWithValue("@ParentCompany", CompanyModel.ParentCompany);
                    cmd.Parameters.AddWithValue("@KeyAccountSR", CompanyModel.KeyAccountSR);
                    cmd.Parameters.AddWithValue("@CreateBy", CompanyModel.CreateBy);
                    cmd.Parameters.AddWithValue("@EditBy", CompanyModel.EditBy);
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

        public int UpdateData(CompanyModels CompanyModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_Company_Upd", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", CompanyModel.ID);
                    cmd.Parameters.AddWithValue("@CompanyCode", CompanyModel.CompanyCode);
                    cmd.Parameters.AddWithValue("@CompanyNameTH", CompanyModel.CompanyNameTH);
                    cmd.Parameters.AddWithValue("@CompanyNameEN", CompanyModel.CompanyNameEN);
                    cmd.Parameters.AddWithValue("@CompanyTypeID", CompanyModel.CompanyTypeID);
                    cmd.Parameters.AddWithValue("@CustSegment", CompanyModel.CustSegment);
                    cmd.Parameters.AddWithValue("@Validity", CompanyModel.Validity);
                    cmd.Parameters.AddWithValue("@PaymentTypeID", CompanyModel.PaymentTypeID);
                    cmd.Parameters.AddWithValue("@CreditTerm", CompanyModel.CreditTerm);
                    cmd.Parameters.AddWithValue("@CreditLimit", CompanyModel.CreditLimit);
                    cmd.Parameters.AddWithValue("@ParentCompany", CompanyModel.ParentCompany);
                    cmd.Parameters.AddWithValue("@KeyAccountSR", CompanyModel.KeyAccountSR);
                    cmd.Parameters.AddWithValue("@EditBy", CompanyModel.EditBy);
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

        public int DeleteData(CompanyModels CompanyModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_Company_Del", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", CompanyModel.ID);
                    cmd.Parameters.AddWithValue("@EditBy", CompanyModel.EditBy);
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
                    SqlCommand cmd = new SqlCommand("SP_Company_SelByID", conObj);
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
                    SqlCommand cmd = new SqlCommand("SP_Company_Sel", conObj);
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