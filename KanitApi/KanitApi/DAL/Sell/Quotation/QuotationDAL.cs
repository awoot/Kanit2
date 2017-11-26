using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using KanitApi.Models.Sell.Quotation;
using System;
using KanitApi.Providers;

namespace KanitApi.DAL.Sell.Quotation
{
    public class QuotationDAL
    {
        string conStr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        int result = 0;
        public int InsertData(QuotationModels QuotationModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_Quotation_Ins", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@QuotationNo", QuotationModel.QuotationNo != null ? QuotationModel.QuotationNo : "");
                    cmd.Parameters.AddWithValue("@CompID", QuotationModel.CompID);
                    cmd.Parameters.AddWithValue("@Ref", QuotationModel.Ref != null ? QuotationModel.Ref : "");
                    cmd.Parameters.AddWithValue("@QuotationDate", QuotationModel.QuotationDate);
                    cmd.Parameters.AddWithValue("@Validity", QuotationModel.Validity);
                    cmd.Parameters.AddWithValue("@DeliveryTime", QuotationModel.DeliveryTime);
                    cmd.Parameters.AddWithValue("@PaymentTerm", QuotationModel.PaymentTerm);
                    cmd.Parameters.AddWithValue("@WarningDate", QuotationModel.WarningDate);
                    cmd.Parameters.AddWithValue("@IncoTerm", QuotationModel.IncoTerm);
                    cmd.Parameters.AddWithValue("@IncoDetail", QuotationModel.IncoDetail != null ? QuotationModel.IncoDetail : "");
                    cmd.Parameters.AddWithValue("@Discount", QuotationModel.Discount);
                    cmd.Parameters.AddWithValue("@Seller", QuotationModel.Seller);
                    cmd.Parameters.AddWithValue("@State", QuotationModel.State);
                    cmd.Parameters.AddWithValue("@Currency", QuotationModel.Currency);
                    cmd.Parameters.AddWithValue("@CostSheet", QuotationModel.CostSheet != null ? QuotationModel.CostSheet : "");
                    cmd.Parameters.AddWithValue("@Reason", QuotationModel.Reason != null ? QuotationModel.Reason : "");
                    cmd.Parameters.AddWithValue("@Remark", QuotationModel.Remark != null ? QuotationModel.Remark : "");
                    cmd.Parameters.AddWithValue("@Vat", QuotationModel.Vat);
                    cmd.Parameters.AddWithValue("@Docver", QuotationModel.Docver);
                    cmd.Parameters.AddWithValue("@CreateBy", QuotationModel.CreateBy);
                    cmd.Parameters.AddWithValue("@EditBy", QuotationModel.EditBy);
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

        public int UpdateData(QuotationModels QuotationModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_Quotation_Upd", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", QuotationModel.ID);
                    cmd.Parameters.AddWithValue("@QuotationNo", QuotationModel.QuotationNo != null ? QuotationModel.QuotationNo : "");
                    cmd.Parameters.AddWithValue("@CompID", QuotationModel.CompID);
                    cmd.Parameters.AddWithValue("@Ref", QuotationModel.Ref != null ? QuotationModel.Ref : "");
                    cmd.Parameters.AddWithValue("@QuotationDate", QuotationModel.QuotationDate);
                    cmd.Parameters.AddWithValue("@Validity", QuotationModel.Validity);
                    cmd.Parameters.AddWithValue("@DeliveryTime", QuotationModel.DeliveryTime);
                    cmd.Parameters.AddWithValue("@PaymentTerm", QuotationModel.PaymentTerm);
                    cmd.Parameters.AddWithValue("@WarningDate", QuotationModel.WarningDate);
                    cmd.Parameters.AddWithValue("@IncoTerm", QuotationModel.IncoTerm);
                    cmd.Parameters.AddWithValue("@IncoDetail", QuotationModel.IncoDetail != null ? QuotationModel.IncoDetail : "");
                    cmd.Parameters.AddWithValue("@Discount", QuotationModel.Discount);
                    cmd.Parameters.AddWithValue("@Seller", QuotationModel.Seller);
                    cmd.Parameters.AddWithValue("@State", QuotationModel.State);
                    cmd.Parameters.AddWithValue("@CostSheet", QuotationModel.CostSheet != null ? QuotationModel.CostSheet : "");
                    cmd.Parameters.AddWithValue("@Reason", QuotationModel.Reason != null ? QuotationModel.Reason : "");
                    cmd.Parameters.AddWithValue("@Remark", QuotationModel.Remark != null ? QuotationModel.Remark : "");
                    cmd.Parameters.AddWithValue("@Vat", QuotationModel.Vat);
                    cmd.Parameters.AddWithValue("@Docver", QuotationModel.Docver);
                    cmd.Parameters.AddWithValue("@EditBy", QuotationModel.EditBy);
                    cmd.Parameters.AddWithValue("@Currency", QuotationModel.Currency);

                    conObj.Open();
                    result = cmd.ExecuteNonQuery();

                    if (QuotationModel.Detail != null)
                    {
                        cmd.CommandText = "uspClearQuotationDetail";
                        cmd.Parameters.Clear();
                        cmd.Parameters.AddWithValue("@quoteID", QuotationModel.ID);
                        cmd.ExecuteNonQuery();

                        cmd.CommandText = "uspUpdateQuotationDetail";
                        foreach (var detail in QuotationModel.Detail)
                        {
                            cmd.Parameters.Clear();

                            cmd.Parameters.AddWithValue("@quoteID", QuotationModel.ID);
                            cmd.Parameters.AddWithValue("@productID", detail.ProductID);
                            cmd.Parameters.AddWithValue("@lineNum", detail.LineNum);
                            cmd.Parameters.AddWithValue("@description", detail.Description);
                            cmd.Parameters.AddWithValue("@quantity", detail.Quantity);
                            cmd.Parameters.AddWithValue("@unit", detail.Unit);
                            cmd.Parameters.AddWithValue("@unitPrice", detail.UnitPrice);
                            cmd.Parameters.AddWithValue("@currency", QuotationModel.Currency);

                            cmd.ExecuteNonQuery();
                        }
                    }

                    if (QuotationModel.Action == "SaveDraft")
                    {
                        CommonProvider.Instance.CreateQuotationHistory(QuotationModel.ID, QuotationModel.EditBy, "Save");
                    }
                    else if (QuotationModel.Action == "SendToApprove")
                    {
                        cmd.CommandText = "uspGenQuotationWorkFlow";
                        cmd.Parameters.Clear();
                        cmd.Parameters.AddWithValue("@quoteID", QuotationModel.ID);
                        cmd.Parameters.AddWithValue("@userID", QuotationModel.EditBy);

                        cmd.ExecuteNonQuery();
                        
                        CommonProvider.Instance.CreateQuotationHistory(QuotationModel.ID, QuotationModel.EditBy, "Send To Approve");

                        var quotationWorkFlowAction = new QuotationWorkFlowDAL();
                        quotationWorkFlowAction.AssignedTask(QuotationModel.ID, 1, QuotationModel.EditBy);
                    }

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

        public DataSet SelectByLastVersion()
        {
            DataSet ds = null;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {

                    SqlCommand cmd = new SqlCommand("SP_Quotation_SelMaxVersion", conObj);
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

        public DataSet GetQuotationByID(int id, int currentUserID)
        {
            DataSet ds = new DataSet();

            using (var conn = new SqlConnection(conStr))
            using (var comm = conn.CreateCommand())
            using (var adp = new SqlDataAdapter(comm))
            {
                if (conn.State == ConnectionState.Closed) conn.Open();

                comm.CommandType = CommandType.StoredProcedure;
                comm.CommandText = "uspGetQuotationByID";
                comm.Parameters.AddWithValue("@quoteID", id);
                comm.Parameters.AddWithValue("@currentUserID", currentUserID);

                adp.Fill(ds);
            }

            return ds;
        }
    }
}