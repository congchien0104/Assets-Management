using RookieOnlineAssetManagement.Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Models.Assets
{
    public class AssetUpdateRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Specification { get; set; }
        public DateTime InstalledDate { get; set; }
        public AssetState State { get; set; }
    }
}
