using RookieOnlineAssetManagement.Data.Entities;
using RookieOnlineAssetManagement.Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Data.Entities
{
    public class Assignment
    {
        public int Id { get; set; }
        public DateTime AssignedDate { get; set; }
        public AssignmentState State { get; set; }
        public string Note { get; set; }
        public string AssetId { get; set; }
        public string AssignedBy { get; set; }
        public string AssignedTo { get; set; }
        public Asset Asset { get; set; }
        public User AssignByUser { get; set; }
        public User AssignToUser { get; set; }
        public List<ReturnRequest> ReturnRequests { get; set; }
    }
}
