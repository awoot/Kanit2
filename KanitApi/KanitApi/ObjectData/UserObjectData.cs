using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KanitApi.ObjectData
{
    public class UserObjectData
    {
        public int ID;
        public string UserName;
        public string FirstName;
        public string LastName;
        public string Department;
        public string Position;
        public string Company;
        public string Email;
        public string SecurityID;
        public DateTime CreateDate;
        public int CreateBy;
        public DateTime? EditDate;
        public int EditBy;
    }
}