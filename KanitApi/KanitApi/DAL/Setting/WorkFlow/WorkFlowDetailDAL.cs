using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using KanitApi.Models.Setting.WorkFlow;
using System;

namespace KanitApi.DAL.Setting.WorkFlow
{
    public class WorkFlowDetailDAL
    {
        string conStr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        int result = 0;
        public void InsertData(WorkFlowDetailModels WorkFlowDetailModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_WorkFlowDetail_Ins", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@WorkFlowID", WorkFlowDetailModel.WorkFlowID);
                    cmd.Parameters.AddWithValue("@Col_val", WorkFlowDetailModel.Col_val);
                    cmd.Parameters.AddWithValue("@Equation_val", WorkFlowDetailModel.Equation_val);
                    cmd.Parameters.AddWithValue("@Cond_val1", WorkFlowDetailModel.Cond_val1);
                    cmd.Parameters.AddWithValue("@Cond_val2", WorkFlowDetailModel.Cond_val2);
                    cmd.Parameters.AddWithValue("@Stap1", WorkFlowDetailModel.Stap1);
                    cmd.Parameters.AddWithValue("@Stap2", WorkFlowDetailModel.Stap2);
                    cmd.Parameters.AddWithValue("@Stap3", WorkFlowDetailModel.Stap3);
                    cmd.Parameters.AddWithValue("@Stap4", WorkFlowDetailModel.Stap4);
                    cmd.Parameters.AddWithValue("@Stap5", WorkFlowDetailModel.Stap5);
                    cmd.Parameters.AddWithValue("@Stap6", WorkFlowDetailModel.Stap6);
                    cmd.Parameters.AddWithValue("@CreateBy", WorkFlowDetailModel.CreateBy);
                    cmd.Parameters.AddWithValue("@EditBy", WorkFlowDetailModel.EditBy);
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

        public int UpdateData(WorkFlowDetailModels WorkFlowDetailModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_WorkFlowDetail_Upd", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", WorkFlowDetailModel.ID);
                    cmd.Parameters.AddWithValue("@Col_val", WorkFlowDetailModel.Col_val);
                    cmd.Parameters.AddWithValue("@Equation_val", WorkFlowDetailModel.Equation_val);
                    cmd.Parameters.AddWithValue("@Cond_val1", WorkFlowDetailModel.Cond_val1);
                    cmd.Parameters.AddWithValue("@Cond_val2", WorkFlowDetailModel.Cond_val2);
                    cmd.Parameters.AddWithValue("@Stap1", WorkFlowDetailModel.Stap1);
                    cmd.Parameters.AddWithValue("@Stap2", WorkFlowDetailModel.Stap2);
                    cmd.Parameters.AddWithValue("@Stap3", WorkFlowDetailModel.Stap3);
                    cmd.Parameters.AddWithValue("@Stap4", WorkFlowDetailModel.Stap4);
                    cmd.Parameters.AddWithValue("@Stap5", WorkFlowDetailModel.Stap5);
                    cmd.Parameters.AddWithValue("@Stap6", WorkFlowDetailModel.Stap6);
                    cmd.Parameters.AddWithValue("@EditBy", WorkFlowDetailModel.EditBy);
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

        public int DeleteData(WorkFlowDetailModels WorkFlowDetailModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_WorkFlowDetail_Del", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", WorkFlowDetailModel.ID);
                    cmd.Parameters.AddWithValue("@EditBy", WorkFlowDetailModel.EditBy);
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
                    SqlCommand cmd = new SqlCommand("SP_WorkFlowDetail_SelByID", conObj);
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
                    SqlCommand cmd = new SqlCommand("SP_WorkFlowDetail_Sel", conObj);
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