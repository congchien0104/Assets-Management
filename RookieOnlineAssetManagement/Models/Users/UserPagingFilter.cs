using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Models.Users
{
    public class UserPagingFilter
    {
        public string KeyWord { get; set; }
        public string TypeFilter { get; set; }
        public string SortBy { get; set; }
        public bool IsAscending { get; set; }
        public string IsSortByUpdatedDate { get; set; }
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
    }
}
