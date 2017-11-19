using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using KanitApi.Models.Sell.Quotation;
using System;

using KanitApi.Providers;
using System.Collections.Generic;

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

        public void Action(QuotationWorkFlowActionModels param)
        {

            switch (param.Action)
            {
                case "Approve":
                    {
                        using (var conn = new SqlConnection(conStr))
                        using (var comm = conn.CreateCommand())
                        {
                            if (conn.State == ConnectionState.Closed) conn.Open();

                            comm.CommandType = CommandType.StoredProcedure;
                            comm.CommandText = "uspQuotationWorkFlowAction";

                            comm.Parameters.AddWithValue("@quoteID", param.QuotationID);
                            comm.Parameters.AddWithValue("@ID", param.QuotationWorkFlowID);
                            comm.Parameters.AddWithValue("@step", param.Step);
                            comm.Parameters.AddWithValue("@action", param.Action);
                            comm.Parameters.AddWithValue("@actionBy", param.ActionBy);

                            comm.ExecuteNonQuery();
                        }

                        AssignedTask(param.QuotationID, param.Step, param.ActionBy);
                    }
                    break;
                case "Reject":
                    {
                        using (var conn = new SqlConnection(conStr))
                        using (var comm = conn.CreateCommand())
                        {
                            if (conn.State == ConnectionState.Closed) conn.Open();

                            comm.CommandType = CommandType.StoredProcedure;
                            comm.CommandText = "uspQuotationWorkFlowAction";

                            comm.Parameters.AddWithValue("@quoteID", param.QuotationID);
                            comm.Parameters.AddWithValue("@ID", param.QuotationWorkFlowID);
                            comm.Parameters.AddWithValue("@step", param.Step);
                            comm.Parameters.AddWithValue("@action", param.Action);
                            comm.Parameters.AddWithValue("@actionBy", param.ActionBy);

                            comm.ExecuteNonQuery();
                        }

                        Reject(param.QuotationID, param.ActionBy);
                    }
                    break;
                case "Recall":
                    {
                        //1080 Draft
                        //1088 Created
                        UpdateQuotationStatus(param.QuotationID, param.ActionBy, 1080, 1088);

                        ClearQuotationWorkFlow(param.QuotationID);
                    }
                    break;
                case "SubmitQuote":
                    {
                        //1086 Completed
                        //1088 Created
                        UpdateQuotationStatus(param.QuotationID, param.ActionBy, 1086, 1088);
                    }
                    break;
                case "Pending":
                    {
                        //1086 Completed
                        //1093 Pending
                        UpdateQuotationStatus(param.QuotationID, param.ActionBy, 1086, 1093);
                    }
                    break;
                case "Win":
                    {
                        //1086 Completed
                        //1091 Win
                        UpdateQuotationStatus(param.QuotationID, param.ActionBy, 1086, 1091);
                    }
                    break;
                case "Loss":
                    {
                        //1086 Completed
                        //1092 Loss
                        UpdateQuotationStatus(param.QuotationID, param.ActionBy, 1086, 1092);
                    }
                    break;
            }
        }

        public void AssignedTask(int quoteID, int step, int editBy)
        {
            var ds = new DataSet();

            using (var conn = new SqlConnection(conStr))
            using (var comm = conn.CreateCommand())
            using (var adp = new SqlDataAdapter(comm))
            {
                if (conn.State == ConnectionState.Closed) conn.Open();

                comm.CommandType = CommandType.StoredProcedure;
                comm.CommandText = "uspGetNextStep";

                comm.Parameters.AddWithValue("@quoteID", quoteID);
                comm.Parameters.AddWithValue("@step", step);

                adp.Fill(ds);
            }

            if (ds.Tables[0].Rows.Count == 0)
            {
                CompleteWorkFlow(quoteID, editBy);
            }
            else
            {
                var row = ds.Tables[0].Rows[0];
                var id = row["ID"].ForceToInt32();

                SetAssignedDate(id);

                var email = row["Email"].ForceToString();
                var fullName = row["FullName"].ForceToString();
                var quotationNo = row["QuotationNo"].ForceToString();

                var viewQuotationURL = ConfigurationManager.AppSettings["ViewQuotationURL"];
                var url = string.Format("{0}?id={1}", viewQuotationURL, quoteID);
                var content = new Dictionary<string, string>();

                var from = ConfigurationManager.AppSettings["EmailFrom"];
                var to = email + ";tarajung@gmail.com";

                content.Add("ApprovalName", fullName);
                content.Add("Email", email);
                content.Add("LinkURL", url);
                content.Add("QuotationNo", quotationNo);

                CommonProvider.Instance.SendEmail(from, to, null, null, "APPROVE_TASK", content);
            }
        }

        public void CompleteWorkFlow(int quoteID, int editBy)
        {
            //Completed 1087
            //Approved 1089
            UpdateQuotationStatus(quoteID, editBy, 1086, 1089);
        }

        public void Reject(int quoteID, int editBy)
        {
            //Reject 1087
            //Approved 1089
            UpdateQuotationStatus(quoteID, editBy, 1087, 1089);
        }

        public void SetAssignedDate(int quotationWorkFlowID)
        {
            using (var conn = new SqlConnection(conStr))
            using (var comm = conn.CreateCommand())
            {
                if (conn.State == ConnectionState.Closed) conn.Open();

                comm.CommandType = CommandType.StoredProcedure;
                comm.CommandText = "uspSetAssignedDate";

                comm.Parameters.AddWithValue("@ID", quotationWorkFlowID);

                comm.ExecuteNonQuery();
            }
        }

        public void UpdateQuotationStatus(int quoteID, int editBy, int state, int status)
        {
            using (var conn = new SqlConnection(conStr))
            using (var comm = conn.CreateCommand())
            {
                if (conn.State == ConnectionState.Closed) conn.Open();

                comm.CommandType = CommandType.StoredProcedure;
                comm.CommandText = "uspUpdateQuotationState";

                comm.Parameters.AddWithValue("@id", quoteID);
                comm.Parameters.AddWithValue("@state", state);
                comm.Parameters.AddWithValue("@status", status);
                comm.Parameters.AddWithValue("@editBy", editBy);

                comm.ExecuteNonQuery();
            }
        }

        public void ClearQuotationWorkFlow(int quoteID)
        {
            using (var conn = new SqlConnection(conStr))
            using (var comm = conn.CreateCommand())
            {
                if (conn.State == ConnectionState.Closed) conn.Open();

                comm.CommandType = CommandType.StoredProcedure;
                comm.CommandText = "uspClearQuotationWorkFlow";

                comm.Parameters.AddWithValue("@id", quoteID);

                comm.ExecuteNonQuery();
            }
        }
    }
}