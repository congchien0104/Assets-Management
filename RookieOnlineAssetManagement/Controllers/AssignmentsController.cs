﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RookieOnlineAssetManagement.Interfaces;
using RookieOnlineAssetManagement.Models.Assignments;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AssignmentsController : ControllerBase
    {
        private readonly IAssignmentService _assignmentService;

        public AssignmentsController(IAssignmentService assignmentService)
        {
            _assignmentService = assignmentService;
        }

        [HttpGet("paging")]
        public async Task<IActionResult> GetAssignmentPagingFilter([FromQuery] AssignmentPagingFilterRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            request.Location = User.FindFirst("location")?.Value;
            var assignments = await _assignmentService.GetAssignmentPagingFilter(request);
            return Ok(assignments);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] AssignmentCreateRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var assignmentId = await _assignmentService.Create(request);

            if (assignmentId < 0)
                return BadRequest();
            var assignment = await _assignmentService.GetDetailedAssignment(assignmentId);
            return CreatedAtAction(nameof(GetDetailedAssignment), new { id = assignmentId }, assignment);
        }

        [HttpGet("{assignmentId}")]
        public async Task<IActionResult> GetDetailedAssignment(int assignmentId)
        {
            var result = await _assignmentService.GetDetailedAssignment(assignmentId);
            if (result == null)
                return BadRequest();
            return Ok(result);

        }

        [HttpPut("{assignmentId}")]
        public async Task<IActionResult> Update([FromRoute] int assignmentId, [FromForm] AssignmentUpdateRequest request)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            request.Id = assignmentId;
            var result = await _assignmentService.Update(request);
            if (!result)
                return BadRequest();
            return Ok(result);

        }

        [HttpDelete("{assignmentId}")]
        public async Task<IActionResult> Delete(int assignmentId)
        {
            var result = await _assignmentService.Delete(assignmentId);
            if (!result)
                return BadRequest();
            return Ok(result);

        }

        [HttpGet("states")]
        public IActionResult GetAssignmentState()
        {
            var result = _assignmentService.GetAssignmentStates();
            if (result == null)
                return BadRequest();
            return Ok(result);

        }

        [HttpGet("GetOwnAssignments")]
        public async Task<IActionResult> GetOwnAssignments([FromQuery] AssignmentPagingFilterRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            request.Location = User.FindFirst("location")?.Value;
            return Ok(await _assignmentService.GetOwnAssignments(request, User.Identity.Name));
        }

        [HttpPut("RespondAssignment/{assignmentId}/{isAccepted}")]
        public async Task<IActionResult> RespondAssignment(int assignmentId, bool isAccepted)
        {
            var result = await _assignmentService.RespondAssignment(assignmentId, isAccepted);
            if (!result)
                return BadRequest();
            return Ok(result);
        }
    }
}
