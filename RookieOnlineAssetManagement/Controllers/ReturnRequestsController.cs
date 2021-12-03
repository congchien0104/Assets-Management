using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RookieOnlineAssetManagement.Interfaces;
using RookieOnlineAssetManagement.Models.ReturnRequests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ReturnRequestsController : ControllerBase
    {
        private readonly IReturnRequestService _returnRequestService;
        public ReturnRequestsController(IReturnRequestService returnRequestService)
        {
            _returnRequestService = returnRequestService;
        }

        [HttpGet("paging")]
        public async Task<IActionResult> GetReturnRequestPagingFilter([FromQuery] ReturnRequestPagingFilterRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            request.Location = User.FindFirst("location")?.Value;
            var assignments = await _returnRequestService.GetReturnRequestPagingFilter(request);
            return Ok(assignments);
        }

        [HttpGet("{returnRequestId}")]
        public async Task<IActionResult> GetDetailedReturnRequest(int returnRequestId)
        {
            var result = await _returnRequestService.GetDetailedReturnRequest(returnRequestId);
            if (result == null)
                return BadRequest();
            return Ok(result);
        }

        [HttpGet("states")]
        public IActionResult GetRequestState()
        {
            var result = _returnRequestService.GetRequestStates();
            if (result == null)
                return BadRequest();
            return Ok(result);
        }
    }
}
