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
            };
            var category = _context.Categories.Where(c => c.Id == request.Category.Id);
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
