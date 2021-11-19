using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RookieOnlineAssetManagement.Interfaces;
using RookieOnlineAssetManagement.Models.Assets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AssetsController : ControllerBase
    {
        private readonly IAssetService _assetService;
        public AssetsController(IAssetService assetService)
        {
            _assetService = assetService;
        }
        [HttpGet("paging")]
        public async Task<IActionResult> GetAssetsPagingFilter([FromQuery] AssetPagingFilterRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var assets = await _assetService.GetAssetsPagingFilter(request);
            return Ok(assets);
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromForm] AssetCreateRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var assetId = await _assetService.Create(request);
            if (assetId < 0)
                return BadRequest();
            var asset = await _assetService.GetDetailedAsset(assetId);
            return CreatedAtAction(nameof(GetDetailedAsset), new { id = assetId }, asset);
        }
        [HttpGet("{assetId}")]
        public async Task<IActionResult> GetDetailedAsset(int assetId)
        {
            var result = await _assetService.GetDetailedAsset(assetId);
            if (result == null)
                return BadRequest();
            return Ok(result);

        }
        [HttpPut("{assetId}")]
        public async Task<IActionResult> Update([FromRoute] int assetId, [FromForm] AssetUpdateRequest request)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            request.Id = assetId;
            var result = await _assetService.Update(request);
            if (result)
                return BadRequest();
            return Ok(result);

        }
        [HttpDelete("{assetId}")]
        public async Task<IActionResult> Delete(int assetId)
        {
            var result = await _assetService.Delete(assetId);
            if (result)
                return BadRequest();
            return Ok(result);

        }
        [HttpGet("states")]
        public IActionResult GetAssetState()
        {
            var result = _assetService.GetAllAssetStates();
            if (result == null)
                return BadRequest();
            return Ok(result);

        }
        [HttpGet("categories")]
        public IActionResult GetAllCategories()
        {
            var result = _assetService.GetAllCategories();
            if (result.Count == 0)
                return BadRequest();
            return Ok(result);
        }
    }
}
