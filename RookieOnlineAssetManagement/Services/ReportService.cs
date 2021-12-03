using Microsoft.EntityFrameworkCore;
using RookieOnlineAssetManagement.Data;
using RookieOnlineAssetManagement.Data.Enums;
using RookieOnlineAssetManagement.ExtensionMethods;
using RookieOnlineAssetManagement.Interfaces;
using RookieOnlineAssetManagement.Models.Reports;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Services
{
    public class ReportService : IReportService
    {
        private readonly ApplicationDbContext _dbcontext;

        public ReportService(ApplicationDbContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        public async Task<List<ReportVM>> GetReports(string sortBy, bool isAscending)
        {
            var query = _dbcontext.Categories.AsQueryable().Include(c => c.Assets)
                .Select(c => new ReportVM
                {
                    Category = c.Name,
                    Total = c.Assets.Count,
                    Assigned = c.Assets.Where(a => a.State == AssetState.Assigned).ToList().Count,
                    Available = c.Assets.Where(a => a.State == AssetState.Available).ToList().Count,
                    NotAvailable = c.Assets.Where(a => a.State == AssetState.NotAvailable).ToList().Count,
                    WaitingForRecycling = c.Assets.Where(a => a.State == AssetState.WaitingForRecycling).ToList().Count,
                    Recycled = c.Assets.Where(a => a.State == AssetState.Recycled).ToList().Count
                });
            query = query.OrderByIf(sortBy == "category", x => x.Category, isAscending);
            query = query.OrderByIf(sortBy == "total", x => x.Total, isAscending);
            query = query.OrderByIf(sortBy == "assigned", x => x.Assigned, isAscending);
            query = query.OrderByIf(sortBy == "available", x => x.Available, isAscending);
            query = query.OrderByIf(sortBy == "notAvailable", x => x.NotAvailable, isAscending);
            query = query.OrderByIf(sortBy == "waitingForRecycling", x => x.WaitingForRecycling, isAscending);
            query = query.OrderByIf(sortBy == "recycled", x => x.Recycled, isAscending);
            return await query.ToListAsync();
        }
    }
}
