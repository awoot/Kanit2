using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace KanitApi.Models.Company
{
    public class ContactPersonModels
    {
        public int ID { get; set; }

        public int CompID { get; set; }

        public int Salutation { get; set; }

        public string FirstNameTH { get; set; }

        public string LastNameTH { get; set; }

        public string FirstNameEN { get; set; }

        public string LastNameEN { get; set; }

        public string MobileNo { get; set; }

        public string Email { get; set; }

        public int EmailLetters { get; set; }

        public string Position { get; set; }

        public int CreateBy { get; set; }

        public int EditBy { get; set; }
    }
}