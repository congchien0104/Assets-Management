using RookieOnlineAssetManagement.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Models.Assets
{
    public class AssetPagingFilterRequest 
    {
        public string KeyWord { get; set; }
        public string StatesFilter { get; set; }
        public string CategoriesFilter { get; set; }
        public string SortBy { get; set; }
        public bool IsAscending { get; set; }
        public string IsSortByUpdatedDate { get; set; }
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
    }
}
