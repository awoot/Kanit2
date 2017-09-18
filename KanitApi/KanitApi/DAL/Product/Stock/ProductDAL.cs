using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using KanitApi.Models.Product.Stock;
using System;

namespace KanitApi.DAL.Product.Stock
{
    public class ProductDAL
    {
        string conStr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        int result = 0;
        public void InsertData(ProductModels ProductModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_Product_Ins", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@OrdNumber", ProductModel.OrdNumber);
                    cmd.Parameters.AddWithValue("@ProductCode", ProductModel.ProductCode);
                    cmd.Parameters.AddWithValue("@ProductDetail", ProductModel.ProductDetail);
                    cmd.Parameters.AddWithValue("@Unit", ProductModel.Unit);
                    cmd.Parameters.AddWithValue("@Remain", ProductModel.Remain);
                    cmd.Parameters.AddWithValue("@StandardCost", ProductModel.StandardCost);
                    cmd.Parameters.AddWithValue("@SellingPrice", ProductModel.SellingPrice);
                    cmd.Parameters.AddWithValue("@WarningStock", ProductModel.WarningStock);
                    cmd.Parameters.AddWithValue("@CreateBy", ProductModel.CreateBy);
                    cmd.Parameters.AddWithValue("@EditBy", ProductModel.EditBy);
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

        public int UpdateData(ProductModels ProductModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_Product_Upd", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", ProductModel.ID);
                    cmd.Parameters.AddWithValue("@OrdNumber", ProductModel.OrdNumber);
                    cmd.Parameters.AddWithValue("@ProductCode", ProductModel.ProductCode);
                    cmd.Parameters.AddWithValue("@ProductDetail", ProductModel.ProductDetail);
                    cmd.Parameters.AddWithValue("@Unit", ProductModel.Unit);
                    cmd.Parameters.AddWithValue("@Remain", ProductModel.Remain);
                    cmd.Parameters.AddWithValue("@StandardCost", ProductModel.StandardCost);
                    cmd.Parameters.AddWithValue("@SellingPrice", ProductModel.SellingPrice);
                    cmd.Parameters.AddWithValue("@WarningStock", ProductModel.WarningStock);
                    cmd.Parameters.AddWithValue("@EditBy", ProductModel.EditBy);
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

        public int DeleteData(ProductModels ProductModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_Product_Del", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", ProductModel.ID);
                    cmd.Parameters.AddWithValue("@EditBy", ProductModel.EditBy);
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
                    SqlCommand cmd = new SqlCommand("SP_Product_SelByID", conObj);
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
                    SqlCommand cmd = new SqlCommand("SP_Product_Sel", conObj);
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