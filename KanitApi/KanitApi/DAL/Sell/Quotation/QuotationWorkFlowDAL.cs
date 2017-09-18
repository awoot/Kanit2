using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using KanitApi.Models.Sell.Quotation;
using System;

namespace KanitApi.DAL.Sell.Quotation
{
    public class QuotationWorkFlowDAL
    {
        string conStr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        int result = 0;
        public void InsertData(QuotationWorkFlowModels QuotationWorkFlowModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_QuotationWorkFlow_Ins", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@QuoteID", QuotationWorkFlowModel.QuoteID);
                    cmd.Parameters.AddWithValue("@WorkFlowID", QuotationWorkFlowModel.WorkFlowID);
                    cmd.Parameters.AddWithValue("@Step1", QuotationWorkFlowModel.Step1);
                    cmd.Parameters.AddWithValue("@Step2", QuotationWorkFlowModel.Step2);
                    cmd.Parameters.AddWithValue("@Step3", QuotationWorkFlowModel.Step3);
                    cmd.Parameters.AddWithValue("@Step4", QuotationWorkFlowModel.Step4);
                    cmd.Parameters.AddWithValue("@Step5", QuotationWorkFlowModel.Step5);
                    cmd.Parameters.AddWithValue("@Step6", QuotationWorkFlowModel.Step6);
                    cmd.Parameters.AddWithValue("@ActionStep1", QuotationWorkFlowModel.ActionStep1);
                    cmd.Parameters.AddWithValue("@ActionStep2", QuotationWorkFlowModel.ActionStep2);
                    cmd.Parameters.AddWithValue("@ActionStep3", QuotationWorkFlowModel.ActionStep3);
                    cmd.Parameters.AddWithValue("@ActionStep4", QuotationWorkFlowModel.ActionStep4);
                    cmd.Parameters.AddWithValue("@ActionStep5", QuotationWorkFlowModel.ActionStep5);
                    cmd.Parameters.AddWithValue("@ActionStep6", QuotationWorkFlowModel.ActionStep6);
                    cmd.Parameters.AddWithValue("@ActDate1", QuotationWorkFlowModel.ActDate1);
                    cmd.Parameters.AddWithValue("@ActDate2", QuotationWorkFlowModel.ActDate2);
                    cmd.Parameters.AddWithValue("@ActDate3", QuotationWorkFlowModel.ActDate3);
                    cmd.Parameters.AddWithValue("@ActDate4", QuotationWorkFlowModel.ActDate4);
                    cmd.Parameters.AddWithValue("@ActDate5", QuotationWorkFlowModel.ActDate5);
                    cmd.Parameters.AddWithValue("@ActDate6", QuotationWorkFlowModel.ActDate6);
                    cmd.Parameters.AddWithValue("@ActOn1", QuotationWorkFlowModel.ActOn1);
                    cmd.Parameters.AddWithValue("@ActOn2", QuotationWorkFlowModel.ActOn2);
                    cmd.Parameters.AddWithValue("@ActOn3", QuotationWorkFlowModel.ActOn3);
                    cmd.Parameters.AddWithValue("@ActOn4", QuotationWorkFlowModel.ActOn4);
                    cmd.Parameters.AddWithValue("@ActOn5", QuotationWorkFlowModel.ActOn5);
                    cmd.Parameters.AddWithValue("@ActOn6", QuotationWorkFlowModel.ActOn6);
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

        public int UpdateData(QuotationWorkFlowModels QuotationWorkFlowModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_QuotationWorkFlow_Upd", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", QuotationWorkFlowModel.ID);
                    cmd.Parameters.AddWithValue("@WorkFlowID", QuotationWorkFlowModel.WorkFlowID);
                    cmd.Parameters.AddWithValue("@Step1", QuotationWorkFlowModel.Step1);
                    cmd.Parameters.AddWithValue("@Step2", QuotationWorkFlowModel.Step2);
                    cmd.Parameters.AddWithValue("@Step3", QuotationWorkFlowModel.Step3);
                    cmd.Parameters.AddWithValue("@Step4", QuotationWorkFlowModel.Step4);
                    cmd.Parameters.AddWithValue("@Step5", QuotationWorkFlowModel.Step5);
                    cmd.Parameters.AddWithValue("@Step6", QuotationWorkFlowModel.Step6);
                    cmd.Parameters.AddWithValue("@ActionStep1", QuotationWorkFlowModel.ActionStep1);
                    cmd.Parameters.AddWithValue("@ActionStep2", QuotationWorkFlowModel.ActionStep2);
                    cmd.Parameters.AddWithValue("@ActionStep3", QuotationWorkFlowModel.ActionStep3);
                    cmd.Parameters.AddWithValue("@ActionStep4", QuotationWorkFlowModel.ActionStep4);
                    cmd.Parameters.AddWithValue("@ActionStep5", QuotationWorkFlowModel.ActionStep5);
                    cmd.Parameters.AddWithValue("@ActionStep6", QuotationWorkFlowModel.ActionStep6);
                    cmd.Parameters.AddWithValue("@ActDate1", QuotationWorkFlowModel.ActDate1);
                    cmd.Parameters.AddWithValue("@ActDate2", QuotationWorkFlowModel.ActDate2);
                    cmd.Parameters.AddWithValue("@ActDate3", QuotationWorkFlowModel.ActDate3);
                    cmd.Parameters.AddWithValue("@ActDate4", QuotationWorkFlowModel.ActDate4);
                    cmd.Parameters.AddWithValue("@ActDate5", QuotationWorkFlowModel.ActDate5);
                    cmd.Parameters.AddWithValue("@ActDate6", QuotationWorkFlowModel.ActDate6);
                    cmd.Parameters.AddWithValue("@ActOn1", QuotationWorkFlowModel.ActOn1);
                    cmd.Parameters.AddWithValue("@ActOn2", QuotationWorkFlowModel.ActOn2);
                    cmd.Parameters.AddWithValue("@ActOn3", QuotationWorkFlowModel.ActOn3);
                    cmd.Parameters.AddWithValue("@ActOn4", QuotationWorkFlowModel.ActOn4);
                    cmd.Parameters.AddWithValue("@ActOn5", QuotationWorkFlowModel.ActOn5);
                    cmd.Parameters.AddWithValue("@ActOn6", QuotationWorkFlowModel.ActOn6);
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

        //public int DeleteData(QuotationWorkFlowModels QuotationWorkFlowModel)
        //{
        //    using (SqlConnection conObj = new SqlConnection(conStr))
        //    {
        //        try
        //        {
        //            SqlCommand cmd = new SqlCommand("SP_QuotationWorkFlow_Del", conObj);
        //            cmd.CommandType = CommandType.StoredProcedure;
        //            cmd.Parameters.AddWithValue("@ID", QuotationWorkFlowModel.ID);
        //            conObj.Open();
        //            result = cmd.ExecuteNonQuery();
        //            return result;
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

    }
}