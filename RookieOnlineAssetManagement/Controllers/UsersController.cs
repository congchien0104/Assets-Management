﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RookieOnlineAssetManagement.Data;
using RookieOnlineAssetManagement.Data.Entities;
using RookieOnlineAssetManagement.Data.Enums;
using RookieOnlineAssetManagement.Data.ViewModel;
using RookieOnlineAssetManagement.Interfaces;
using RookieOnlineAssetManagement.Models.Users;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("GetUserLogin")]
        public async Task<IActionResult> GetUserLogin()
        {
            var user = await _userService.GetUserLogin(User.Identity.Name);

            return Ok(new
            {
                id = user.Id,
                fullName = user.LastName + " " + user.FirstName,
                gender = user.Gender,
                type = user.Type
            });
        }

        [HttpGet("Logout")]
        public async Task<IActionResult> Logout()
        {
            var isLogout = await _userService.Logout();
            return Ok(new { isLogout = isLogout });
        }

        [HttpPut("ChangePassword")]
        public async Task<IActionResult> ChangePassword(ChangePasswordVM vm)
        {
            var result = await _userService.ChangePassword(vm);
            if (result == 1)
                return Ok(new { message = "Password has been changed successfully!" });
            else if (result == 2)
                return BadRequest(new { message = "Incorrect current password!" });
            return BadRequest(new { message = "Both password can not be empty!" });
        }

        [HttpPut("ChangePasswordFirstTime")]
        public async Task<IActionResult> ChangePasswordFirstTime(ChangePasswordVM vm)
        {
            var result = await _userService.ChangePasswordFirstTime(vm);
            if (!result)
                return BadRequest();
            return Ok(new { message = "Password has been changed successfully!" });
        }
        [HttpGet("paging")]
        public async Task<IActionResult> GetUsersPagingFilter([FromQuery] UserPagingFilter request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var users = await _userService.GetUsersPagingFilter(request);
            return Ok(users);
        }

        [HttpPost]
        public async Task<ActionResult<UserModel>> CreateUser([FromForm] UserModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            model.Location = User.FindFirst("location")?.Value;
            var userId = await _userService.Create(model);
            if (userId < 0)
                return BadRequest();
            var user = await _userService.GetUser(userId);
            return CreatedAtAction(nameof(GetUser), new { id = userId }, user);
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUser(int userId)
        {
            var result = await _userService.GetUser(userId);
            if (result == null)
                return BadRequest();
            return Ok(result);

        }

        [HttpPut("{userId}")]
        public async Task<IActionResult> UpdateUser([FromRoute] int userId, [FromForm] UserUpdate model)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            model.Id = userId;
            var result = await _userService.Update(model);
            if (!result)
                return BadRequest();
            return Ok(result);

        }
        [HttpPatch("{userId}")]
        public async Task<IActionResult> DisabledUser(int userId)
        {
            var result = await _userService.Disabled(userId);
            if (!result)
                return BadRequest();
            return Ok(result);

        }
    }
}
