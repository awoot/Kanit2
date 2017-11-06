using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace KanitApi.Providers
{

    public static class Extension
    {
        public static string ForceToString(this object input)
        {
            if (input != null) return input.ToString();
            else return string.Empty;
        }

        public static object ForceToDateTimeSql(this DateTime? input)
        {
            if (input == null) return DBNull.Value;
            else return input.Value;
        }

        public static DateTime? ForceToDateNull(this object input)
        {
            try
            {
                return Convert.ToDateTime(input);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public static DateTime ForceToDate(this object input)
        {
            return Convert.ToDateTime(input);
        }

        public static bool ForceToBoolean(this object input)
        {
            if (input == DBNull.Value) input = false;
            return Convert.ToBoolean(input);
        }

        public static int ForceToInt32(this object input)
        {
            return Convert.ToInt32(input);
        }

        public static int? ForceToInt32Null(this object input)
        {
            try
            {
                return Convert.ToInt32(input);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public static decimal ForceToDecimal(this object reader)
        {
            return Convert.ToDecimal(reader);
        }
        public static decimal? ForceToDecimalNull(this object reader)
        {
            if (reader == null || reader == DBNull.Value) return null;
            else return Convert.ToDecimal(reader);
        }

        public static Guid ForceToGUID(this object reader)
        {
            if (reader == null || reader == DBNull.Value) return new Guid();
            else return new Guid(reader.ToString());
        }

        public static bool ForceStringToBoolean(this object reader)
        {
            return Convert.ToBoolean(Convert.ToString(reader));
        }

        public static void AddWithValueWithCheckDbNull(this SqlParameterCollection input, string parameterName, object value)
        {
            if (value == null)
            {
                input.AddWithValue(parameterName, DBNull.Value);
            }
            else
            {
                input.AddWithValue(parameterName, value);
            }
        }

    
    }
}