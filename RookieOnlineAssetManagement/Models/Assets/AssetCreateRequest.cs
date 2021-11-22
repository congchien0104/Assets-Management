using RookieOnlineAssetManagement.Data.Entities;
using RookieOnlineAssetManagement.Data.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Models.Assets
{
    public class AssetCreateRequest
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Specification { get; set; }
        [Required]
        public bool IsAvailable { get; set; }
        [Required]
        public DateTime InstalledDate { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string CategoryCode { get; set; }
    }
}
