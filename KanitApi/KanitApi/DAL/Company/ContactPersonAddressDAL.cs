using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using KanitApi.Models.Company;
using System;
using System.Collections.Generic;

namespace KanitApi.DAL.Company
{
    public class ContactPersonAddressDAL
    {
        string conStr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        int result = 0;
        public int InsertData(ContactPersonAddressModels AddressModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("uspCreateContactPersonAddress", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ContactPersonID", AddressModel.ContactPersonID);
                    cmd.Parameters.AddWithValue("@Address", AddressModel.Address);
                    cmd.Parameters.AddWithValue("@Province", AddressModel.Province);
                    cmd.Parameters.AddWithValue("@Amphur", AddressModel.Amphur);
                    cmd.Parameters.AddWithValue("@Tambon", AddressModel.Tambon);
                    cmd.Parameters.AddWithValue("@PostCode", AddressModel.PostCode);
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

        public void UpdateData(ContactPersonModels data)
        {
            using (var conn = new SqlConnection(conStr))
            using (var comm = conn.CreateCommand())
            {
                if (conn.State == ConnectionState.Closed) conn.Open();

                comm.CommandType = CommandType.StoredProcedure;

                comm.CommandText = "uspClearContactPersonAddress";
                comm.Parameters.AddWithValue("@ContactPersonID", data.ID);

                comm.ExecuteNonQuery();

                comm.CommandText = "uspCreateContactPersonAddress";

                foreach (var item in data.Address)
                {
                    comm.Parameters.Clear();

                    comm.Parameters.AddWithValue("@ContactPersonID", data.ID);
                    comm.Parameters.AddWithValue("@Address", item.Address);
                    comm.Parameters.AddWithValue("@Province", item.Province);
                    comm.Parameters.AddWithValue("@Amphur", item.Amphur);
                    comm.Parameters.AddWithValue("@Tambon", item.Tambon);
                    comm.Parameters.AddWithValue("@PostCode", item.PostCode);

                    comm.ExecuteNonQuery();
                }
            }
        }

        public int ClearData(int contactPersonID)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("uspClearContactPersonAddress", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@contactPersonID", contactPersonID);
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
                    SqlCommand cmd = new SqlCommand("uspGetContactPersonAddressByID", conObj);
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


        public void DeleteData(int ID)
        {
            using (var conn = new SqlConnection(conStr))
            using (var comm = conn.CreateCommand())
            {
                if (conn.State == ConnectionState.Closed) conn.Open();

                comm.CommandType = CommandType.StoredProcedure;

                comm.CommandText = "uspDeleteContactPersonAddress";
                comm.Parameters.AddWithValue("@ID", ID);

                comm.ExecuteNonQuery();
                
            }
        }
    }
}