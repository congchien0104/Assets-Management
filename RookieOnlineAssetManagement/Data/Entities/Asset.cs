using RookieOnlineAssetManagement.Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Data.Entities
{
    public class Asset
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Specification { get; set; }
        public DateTime InstalledDate { get; set; }
        public AssetState State { get; set; }
        public string Location { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string CategoryId { get; set; }
        public virtual Category Category { get; set; }
        public List<Assignment> Assignments { get; set; }
    }
}
