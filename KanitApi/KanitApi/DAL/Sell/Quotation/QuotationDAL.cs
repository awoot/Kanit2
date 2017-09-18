using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using KanitApi.Models.Sell.Quotation;
using System;
namespace KanitApi.DAL.Sell.Quotation
{
    public class QuotationDAL
    {
        string conStr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        int result = 0;
        public void InsertData(QuotationModels QuotationModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_Quotation_Ins", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@QuotationNo", QuotationModel.QuotationNo);
                    cmd.Parameters.AddWithValue("@CompID", QuotationModel.CompID);
                    cmd.Parameters.AddWithValue("@Ref", QuotationModel.Ref != null ? QuotationModel.CostSheet : "");
                    cmd.Parameters.AddWithValue("@QuotationDate", QuotationModel.QuotationDate);
                    cmd.Parameters.AddWithValue("@Validity", QuotationModel.Validity);
                    cmd.Parameters.AddWithValue("@DeliveryTime", QuotationModel.DeliveryTime);
                    cmd.Parameters.AddWithValue("@PaymentTerm", QuotationModel.PaymentTerm);
                    cmd.Parameters.AddWithValue("@WarningDate", QuotationModel.WarningDate);
                    cmd.Parameters.AddWithValue("@IncoTerm", QuotationModel.IncoTerm);
                    cmd.Parameters.AddWithValue("@IncoDetail", QuotationModel.IncoDetail != null ? QuotationModel.CostSheet : "");
                    cmd.Parameters.AddWithValue("@Discount", QuotationModel.Discount);
                    cmd.Parameters.AddWithValue("@Seller", QuotationModel.Seller);
                    cmd.Parameters.AddWithValue("@State", QuotationModel.State);
                    cmd.Parameters.AddWithValue("@CostSheet", QuotationModel.CostSheet != null ? QuotationModel.CostSheet : "");
                    cmd.Parameters.AddWithValue("@Reason", QuotationModel.Reason != null ? QuotationModel.Reason : "");
                    cmd.Parameters.AddWithValue("@Remark", QuotationModel.Remark != null ? QuotationModel.Remark : "");
                    cmd.Parameters.AddWithValue("@CreateBy", QuotationModel.CreateBy);
                    cmd.Parameters.AddWithValue("@EditBy", QuotationModel.EditBy);
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

        public int UpdateData(QuotationModels QuotationModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_Quotation_Upd", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", QuotationModel.ID);
                    cmd.Parameters.AddWithValue("@QuotationNo", QuotationModel.QuotationNo);
                    cmd.Parameters.AddWithValue("@CompID", QuotationModel.CompID);
                    cmd.Parameters.AddWithValue("@Ref", QuotationModel.Ref != null ? QuotationModel.CostSheet : "");
                    cmd.Parameters.AddWithValue("@QuotationDate", QuotationModel.QuotationDate);
                    cmd.Parameters.AddWithValue("@Validity", QuotationModel.Validity);
                    cmd.Parameters.AddWithValue("@DeliveryTime", QuotationModel.DeliveryTime);
                    cmd.Parameters.AddWithValue("@PaymentTerm", QuotationModel.PaymentTerm);
                    cmd.Parameters.AddWithValue("@WarningDate", QuotationModel.WarningDate);
                    cmd.Parameters.AddWithValue("@IncoTerm", QuotationModel.IncoTerm);
                    cmd.Parameters.AddWithValue("@IncoDetail", QuotationModel.IncoDetail != null ? QuotationModel.CostSheet : "");
                    cmd.Parameters.AddWithValue("@Discount", QuotationModel.Discount);
                    cmd.Parameters.AddWithValue("@Seller", QuotationModel.Seller);
                    cmd.Parameters.AddWithValue("@State", QuotationModel.State);
                    cmd.Parameters.AddWithValue("@CostSheet", QuotationModel.CostSheet != null ? QuotationModel.CostSheet : "");
                    cmd.Parameters.AddWithValue("@Reason", QuotationModel.Reason != null ? QuotationModel.Reason : "");
                    cmd.Parameters.AddWithValue("@Remark", QuotationModel.Remark != null ? QuotationModel.Remark : "");
                    cmd.Parameters.AddWithValue("@EditBy", QuotationModel.EditBy);
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

        public int DeleteData(QuotationModels QuotationModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_Quotation_Del", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", QuotationModel.ID);
                    cmd.Parameters.AddWithValue("@EditBy", QuotationModel.EditBy);
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
                    SqlCommand cmd = new SqlCommand("SP_Quotation_SelByID", conObj);
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
                    SqlCommand cmd = new SqlCommand("SP_Quotation_Sel", conObj);
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