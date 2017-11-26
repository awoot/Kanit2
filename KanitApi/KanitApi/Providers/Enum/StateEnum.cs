using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KanitApi.Providers.Enum
{
    public enum StateEnum
    {
        NOT_CHANGE = -1,
        IN_PROGRESS = 28,
        SUBMIT_QUOTE = 29,
        PENDING = 30,
        WIN = 31,
        LOSS = 32,
        DRAFT = 1080
    }
}