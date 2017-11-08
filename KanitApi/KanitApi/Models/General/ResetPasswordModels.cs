using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KanitApi.Models.General
{
    public class ResetPasswordModels
    {
        public string NewPassword { get; set; }
        public string VerifyPassword { get; set; }
        public string Token { get; set; }
    }
}