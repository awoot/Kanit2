using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using KanitApi.Models.Sell.Quotation;
using System;

namespace KanitApi.DAL.Sell.Quotation
{
    public class QuotationDetailDAL
    {
        string conStr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        int result = 0;
        public void InsertData(QuotationDetailModels QuotationDetailModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_QuotationDetail_Ins", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@QuoteID", QuotationDetailModel.QuoteID);
                    cmd.Parameters.AddWithValue("@ProductID", QuotationDetailModel.ProductID);
                    cmd.Parameters.AddWithValue("@LineNum", QuotationDetailModel.LineNum);
                    cmd.Parameters.AddWithValue("@Description", QuotationDetailModel.Description != null ? QuotationDetailModel.Description : "");
                    cmd.Parameters.AddWithValue("@Quantity", QuotationDetailModel.Quantity);
                    cmd.Parameters.AddWithValue("@Unit", QuotationDetailModel.Unit);
                    cmd.Parameters.AddWithValue("@UnitPrice", QuotationDetailModel.UnitPrice);
                    cmd.Parameters.AddWithValue("@Currency", QuotationDetailModel.Currency);
                    cmd.Parameters.AddWithValue("@Amount", QuotationDetailModel.Amount);
                    cmd.Parameters.AddWithValue("@CreateBy", QuotationDetailModel.CreateBy);
                    cmd.Parameters.AddWithValue("@EditBy", QuotationDetailModel.EditBy);
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

        public int UpdateData(QuotationDetailModels QuotationDetailModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_QuotationDetail_Upd", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", QuotationDetailModel.ID);
                    cmd.Parameters.AddWithValue("@ProductID", QuotationDetailModel.ProductID);
                    cmd.Parameters.AddWithValue("@LineNum", QuotationDetailModel.LineNum);
                    cmd.Parameters.AddWithValue("@Description", QuotationDetailModel.Description != null ? QuotationDetailModel.Description : "");
                    cmd.Parameters.AddWithValue("@Quantity", QuotationDetailModel.Quantity);
                    cmd.Parameters.AddWithValue("@Unit", QuotationDetailModel.Unit);
                    cmd.Parameters.AddWithValue("@UnitPrice", QuotationDetailModel.UnitPrice);
                    cmd.Parameters.AddWithValue("@Currency", QuotationDetailModel.Currency);
                    cmd.Parameters.AddWithValue("@Amount", QuotationDetailModel.Amount);
                    cmd.Parameters.AddWithValue("@EditBy", QuotationDetailModel.EditBy);
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

        public int DeleteData(QuotationDetailModels QuotationDetailModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_QuotationDetail_Del", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", QuotationDetailModel.ID);
                    cmd.Parameters.AddWithValue("@EditBy", QuotationDetailModel.EditBy);
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
                    SqlCommand cmd = new SqlCommand("SP_QuotationDetail_SelByID", conObj);
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
                    SqlCommand cmd = new SqlCommand("SP_QuotationDetail_Sel", conObj);
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