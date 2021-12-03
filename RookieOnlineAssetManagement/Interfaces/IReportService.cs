using RookieOnlineAssetManagement.Models.Reports;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Interfaces
{
    public interface IReportService
    {
        public Task<List<ReportVM>> GetReports(string sortBy, bool isAscending);
    }
}
