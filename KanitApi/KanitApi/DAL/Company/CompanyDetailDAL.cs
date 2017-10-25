using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using KanitApi.Models.Company;
using System;

namespace KanitApi.DAL.Company
{
    public class CompanyDetailDAL
    {
        string conStr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        int result = 0;

        public int InsertData(CompanyDetailModels CompanyDetailModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_CompanyDetail_Ins", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@CompID", CompanyDetailModel.CompID);
                    cmd.Parameters.AddWithValue("@IsSelect", CompanyDetailModel.IsSelect);
                    cmd.Parameters.AddWithValue("@MasterID", CompanyDetailModel.MasterID);
                    cmd.Parameters.AddWithValue("@CreateBy", CompanyDetailModel.CreateBy);
                    cmd.Parameters.AddWithValue("@EditBy", CompanyDetailModel.EditBy);
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
        public int UpdateData(CompanyDetailModels CompanyDetailModel)
        {
            int result = 0;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_CompanyDetail_Upd", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", CompanyDetailModel.ID);
                    cmd.Parameters.AddWithValue("@CompID", CompanyDetailModel.CompID);
                    cmd.Parameters.AddWithValue("@IsSelect", CompanyDetailModel.IsSelect);
                    cmd.Parameters.AddWithValue("@MasterID", CompanyDetailModel.MasterID);
                    cmd.Parameters.AddWithValue("@EditBy", CompanyDetailModel.EditBy);
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
        //public DataSet SelectData()
        //{
        //    SqlConnection con = null;
        //    string result = "";
        //    DataSet ds = null;
        //    using (SqlConnection conObj = new SqlConnection(conStr))
        //    {
        //        try
        //        {

        //            SqlCommand cmd = new SqlCommand("SP_SecurityProfileDetail_Sel", conObj);
        //            cmd.CommandType = CommandType.StoredProcedure;
        //            conObj.Open();
        //            SqlDataAdapter da = new SqlDataAdapter();
        //            da.SelectCommand = cmd;
        //            ds = new DataSet();
        //            da.Fill(ds);
        //            return ds;
        //        }
        //        catch (Exception ex)
        //        {
        //            throw ex;
        //        }
        //        finally
        //        {
        //            conObj.Close();
        //        }
        //    }
        //}

        //public DataSet SelectBySecurityID(int SecurityID)
        //{
        //    DataSet ds = null;
        //    using (SqlConnection conObj = new SqlConnection(conStr))
        //    {
        //        try
        //        {

        //            SqlCommand cmd = new SqlCommand("SP_SecurityProfileDetail_SelBySecurityID", conObj);
        //            cmd.CommandType = CommandType.StoredProcedure;
        //            cmd.Parameters.AddWithValue("@SecurityID", SecurityID);
        //            conObj.Open();
        //            SqlDataAdapter da = new SqlDataAdapter();
        //            da.SelectCommand = cmd;
        //            ds = new DataSet();
        //            da.Fill(ds);
        //            return ds;
        //        }
        //        catch (Exception ex)
        //        {
        //            throw ex;
        //        }
        //        finally
        //        {
        //            conObj.Close();
        //        }
        //    }
        //}

        public void DeleteDetail(CompanyDetailModels CompanyDetailModel)
        {
            SqlConnection con = null;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_CompanyDetail_Del", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", CompanyDetailModel.ID);
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
    }
}