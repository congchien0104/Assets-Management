using ClosedXML.Excel;
using Microsoft.EntityFrameworkCore;
using RookieOnlineAssetManagement.Data;
using RookieOnlineAssetManagement.Data.Enums;
using RookieOnlineAssetManagement.ExtensionMethods;
using RookieOnlineAssetManagement.Interfaces;
using RookieOnlineAssetManagement.Models.Reports;
using System;
using System.Collections.Generic;
using System.IO;
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

        public XLWorkbook ExportReports(List<ReportVM> reports)
        {
            XLWorkbook workbook = new XLWorkbook();
            var worksheet = workbook.Worksheets.Add("Reports");
            int currentRow = 1;

            #region Header
            worksheet.Cell(currentRow, 1).Value = "Category";
            worksheet.Cell(currentRow, 2).Value = "Total";
            worksheet.Cell(currentRow, 3).Value = "Assigned";
            worksheet.Cell(currentRow, 4).Value = "Available";
            worksheet.Cell(currentRow, 5).Value = "Not Available";
            worksheet.Cell(currentRow, 6).Value = "Waiting For Recycling";
            worksheet.Cell(currentRow, 7).Value = "Recycled";
            #endregion

            #region Body
            foreach(var report in reports)
            {
                currentRow++;
                worksheet.Cell(currentRow, 1).Value = report.Category;
                worksheet.Cell(currentRow, 2).Value = report.Total;
                worksheet.Cell(currentRow, 3).Value = report.Assigned;
                worksheet.Cell(currentRow, 4).Value = report.Available;
                worksheet.Cell(currentRow, 5).Value = report.NotAvailable;
                worksheet.Cell(currentRow, 6).Value = report.WaitingForRecycling;
                worksheet.Cell(currentRow, 7).Value = report.Recycled;
            }
            #endregion

            return workbook;
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
