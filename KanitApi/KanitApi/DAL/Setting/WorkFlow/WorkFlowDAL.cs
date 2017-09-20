using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using KanitApi.Models.Setting.WorkFlow;
using System;

namespace KanitApi.DAL.Setting.WorkFlow
{
    public class WorkFlowDAL
    {
        string conStr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        int result = 0;
        public int InsertData(WorkFlowModels WorkFlowModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_WorkFlow_Ins", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@FlowName", WorkFlowModel.FlowName);
                    cmd.Parameters.AddWithValue("@StartDate", WorkFlowModel.StartDate);
                    cmd.Parameters.AddWithValue("@EndDate", WorkFlowModel.EndDate);
                    cmd.Parameters.AddWithValue("@FlowDetail", WorkFlowModel.FlowDetail);
                    cmd.Parameters.AddWithValue("@Remark", WorkFlowModel.Remark);
                    cmd.Parameters.AddWithValue("@CreateBy", WorkFlowModel.CreateBy);
                    cmd.Parameters.AddWithValue("@EditBy", WorkFlowModel.EditBy);
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

        public int UpdateData(WorkFlowModels WorkFlowModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_WorkFlow_Upd", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", WorkFlowModel.ID);
                    cmd.Parameters.AddWithValue("@FlowName", WorkFlowModel.FlowName);
                    cmd.Parameters.AddWithValue("@StartDate", WorkFlowModel.StartDate);
                    cmd.Parameters.AddWithValue("@EndDate", WorkFlowModel.EndDate);
                    cmd.Parameters.AddWithValue("@FlowDetail", WorkFlowModel.FlowDetail);
                    cmd.Parameters.AddWithValue("@Remark", WorkFlowModel.Remark);
                    cmd.Parameters.AddWithValue("@EditBy", WorkFlowModel.EditBy);
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

        public int DeleteData(WorkFlowModels WorkFlowModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_WorkFlow_Del", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", WorkFlowModel.ID);
                    cmd.Parameters.AddWithValue("@EditBy", WorkFlowModel.EditBy);
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
                    SqlCommand cmd = new SqlCommand("SP_WorkFlow_SelByID", conObj);
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
                    SqlCommand cmd = new SqlCommand("SP_WorkFlow_Sel", conObj);
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