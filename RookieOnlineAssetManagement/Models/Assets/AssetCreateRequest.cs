using RookieOnlineAssetManagement.Data.Entities;
using RookieOnlineAssetManagement.Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Models.Assets
{
    public class AssetCreateRequest
    {
        public string Name { get; set; }
        public string Specification { get; set; }
        public bool IsAvailable { get; set; }
        public DateTime InstalledDate { get; set; }
        public string Location { get; set; }
        public Category Category { get; set; }
    }
}
