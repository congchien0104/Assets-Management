using RookieOnlineAssetManagement.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Models.Assets
{
    public class AssetPagingFilter 
    {
        public string KeyWord { get; set; }
        public List<int> StatesFilter { get; set; }
        public List<string> CategoriesFilter { get; set; }
        public string SortBy { get; set; }
        public bool IsAscending { get; set; }
        public string IsSortByUpdatedDate { get; set; }
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
    }
}
