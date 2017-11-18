using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Data;


namespace KanitApi.Models.Setting.User
{
    public class UserModels
    {
        public int ID { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Department { get; set; }
        public int Position { get; set; }
        public int Company { get; set; }
        public int Team { get; set; }

        public DateTime StartDate { get; set; }

        public string Email { get; set; }
        public int SecurityID { get; set; }
        public int CreateBy { get; set; }
        public int EditBy { get; set; }

        public int Section { get; set; }
    }
}