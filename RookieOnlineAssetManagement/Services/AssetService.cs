using RookieOnlineAssetManagement.Data;
using RookieOnlineAssetManagement.Data.Entities;
using RookieOnlineAssetManagement.Interfaces;
using RookieOnlineAssetManagement.Models;
using RookieOnlineAssetManagement.Models.Assets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RookieOnlineAssetManagement.Data.Enums;
using System.Text;
using RookieOnlineAssetManagement.ExtensionMethods;
using RookieOnlineAssetManagement.Shared;
using Microsoft.EntityFrameworkCore;

namespace RookieOnlineAssetManagement.Services
{
    public class AssetService : IAssetService
    {
        private readonly ApplicationDbContext _context;

        public AssetService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<int> Create(AssetCreateRequest request)
        {
            var asset = new Asset()
            {
                Name = request.Name,
                Specification = request.Specification,
                State = request.IsAvailable == true ? AssetState.Available : AssetState.NotAvailable,
                Location = request.Location,
                InstalledDate = request.InstalledDate,
                CreatedDate = DateTime.Now
            };
            var category = await _context.Categories.FindAsync(request.Category.Id);
            if (category == null)
            {
                var newCategory = new Category()
                {
                    Name = request.Category.Name,
                    Code = GenerateCategoryCode(request.Category.Name),
                    CreatedDate = DateTime.Now
                };
                _context.Categories.Add(newCategory);
                if (await _context.SaveChangesAsync() > 0)
                {
                    asset.CategoryId = newCategory.Id;
                }
            }
            else
            {
                asset.CategoryId = request.Category.Id;
            }
            asset.Code = GenerateAssetCode(asset.CategoryId);
            _context.Assets.Add(asset);
            await _context.SaveChangesAsync();
            return asset.Id;
        }

        public async Task<bool> Delete(int assetId)
        {
            var asset = await _context.Assets.FindAsync(assetId);
            if (asset == null)
                throw new Exception($"Cannot find a asset with id {assetId}");
            if (asset.Assignments.Count > 0)
                //throw new Exception($"Cannot delete the asset because it belongs to one or more historical assignments.");
                return false;
            _context.Assets.Remove(asset);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<AssetVM> GetDetailedAsset(int assetId)
        {
            var asset = await _context.Assets.FindAsync(assetId);
            if (asset == null)
                throw new Exception($"Cannot find a asset with id {assetId}");
            var histories = new List<AssignmentHistory>();
            foreach (var assignment in asset.Assignments)
            {
                histories.Add(new AssignmentHistory()
                {
                    AssignedDate = assignment.AssignedDate,
                    AssignedBy = _context.Users.Find(assignment.AssignedBy).UserName,
                    AssignedTo = _context.Users.Find(assignment.AssignedTo).UserName,
                    ReturnedDate = _context.ReturnRequests.FirstOrDefault(rr => rr.AssignmentId == assignment.Id
                                    && rr.State == ReturnRequestState.Completed).ReturnedDate
                });
            }
            var detailedAsset = new AssetVM()
            {
                Code = asset.Code,
                Name = asset.Name,
                Category = asset.Category,
                InstalledDate = asset.InstalledDate,
                State = asset.State,
                Location = asset.Location,
                Specification = asset.Specification,
                Histories = histories

            };
            return detailedAsset;
        }

        public async Task<PagedResultBase<AssetVM>> GetAssetsPagingFilter(AssetPagingFilter filter)
        {
            // Filter
            IQueryable<Asset> query = _context.Assets.AsQueryable()
                .WhereIf(filter.KeyWord != null, x => x.Name.Contains(filter.KeyWord) || x.Code.Contains(filter.KeyWord));
            foreach (var category in filter.CategoriesFilter)
            {
                query.Where(x => x.Category.Name.Contains(category));
            }
            foreach (var state in filter.StatesFilter)
            {
                query.Where(x => x.State == (AssetState)state);
            }
            // Sort
            switch (filter.SortBy)
            {
                case "assetCode":
                    query = filter.IsAscending ? query.OrderBy(u => u.Code) : query.OrderByDescending(u => u.Code);
                    break;
                case "assetName":
                    query = filter.IsAscending ? query.OrderBy(u => u.Name) : query.OrderByDescending(u => u.Name);
                    break;
                case "category":
                    query = filter.IsAscending ? query.OrderBy(u => u.Category.Name) : query.OrderByDescending(u => u.Category.Name);

                    break;
                case "state":
                    query = filter.IsAscending ? query.OrderBy(u => u.State) : query.OrderByDescending(u => u.State);

                    break;
                default:
                    break;
            }
            // Paging and Projection
            var data = await query.Paged(filter.PageIndex, filter.PageSize).Select(a => new AssetVM()
            {
                Code = a.Code,
                Name = a.Name,
                Category = a.Category,
                State = a.State
            }).ToListAsync();
            var pagedResult = new PagedResultBase<AssetVM>()
            {
                TotalRecords = data.Count,
                PageSize = filter.PageSize,
                PageIndex = filter.PageIndex,
                Items = data
            };
            return pagedResult;
        }

        public async Task<bool> Update(AssetUpdateRequest request)
        {
            var asset = await _context.Assets.FindAsync(request.Id);
            if (asset == null)
                throw new Exception($"Cannot find a asset with id {request.Id}");
            if (request.State == AssetState.Assigned)
                throw new Exception($"Cannot edit a asset with state Assigned");
            asset.State = request.State;
            asset.Name = request.Name;
            asset.Specification = request.Specification;
            asset.InstalledDate = request.InstalledDate;
            asset.UpdatedDate = DateTime.Now;
            _context.Assets.Update(asset);
            return await _context.SaveChangesAsync() > 0;

        }

        public List<string> GetAllCategories()
        {
            var categories = _context.Categories.OrderBy(x => x.Name).Select(c => c.Name.ToString()).ToList();
            return categories;
        }

        public List<string> GetAllAssetStates()
        {
            List<string> assetStateList = new List<string>();
            foreach (var state in (AssetState[])Enum.GetValues(typeof(AssetState)))
            {
                assetStateList.Add(state.ToString());
            }
            return assetStateList;
        }
        private string GenerateAssetCode(int categoryId)
        {
            string categoryCode = _context.Categories.FirstOrDefault(c => c.Id == categoryId).Code;
            var maxAssetCode = _context.Assets.Where(a => a.CategoryId == categoryId)
                                              .OrderBy(a => a.Code).FirstOrDefault();
            int number = Convert.ToInt32(maxAssetCode.Code.Replace(categoryCode, "")) + 1;
            string newAssetCode = categoryCode + number.ToString("D6");
            return newAssetCode;
        }
        private string GenerateCategoryCode(string categoryName)
        {
            List<string> words = categoryName.Split(' ').ToList();
            StringBuilder categoryCode = new StringBuilder();
            foreach (var word in words)
            {
                categoryCode.Append(Char.ToUpper(word[0]));
            };
            return categoryCode.ToString();
        }
    }
}
