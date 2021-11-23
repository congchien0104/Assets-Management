using Microsoft.AspNetCore.Authorization;
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
    //[Authorize]
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

            // Add claim location to User ClaimsIdentity
            ClaimsIdentity claimsIdentity = new ClaimsIdentity();
            claimsIdentity.AddClaim(new Claim("location", user.Location));
            User.AddIdentity(claimsIdentity);

            return Ok(new { 
                id = user.Id,
                fullName = user.LastName + " " + user.FirstName,
                gender = user.Gender,
                type = user.Type
            });
        }

        [HttpGet("Logout")]
        public async Task<IActionResult> Logout()
        [HttpPost]
        public async Task<ActionResult<UserModel>> CreateUser([FromForm] UserModel model)
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
            else if(result == 2)
                return BadRequest(new { message = "Incorrect current password!" });
            return BadRequest(new { message = "Both password can not be empty!" });
        }

        [HttpPut("ChangePasswordFirstTime")]
        public async Task<IActionResult> ChangePasswordFirstTime(ChangePasswordVM vm)
        {
            var result = await _userService.ChangePasswordFirstTime(vm);
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
            return Ok(new { message = "Password has been changed successfully!" });
        }
    }
}
