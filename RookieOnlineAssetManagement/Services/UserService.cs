using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RookieOnlineAssetManagement.Data;
using RookieOnlineAssetManagement.Data.Entities;
using RookieOnlineAssetManagement.Data.Enums;
using RookieOnlineAssetManagement.Data.ViewModel;
using RookieOnlineAssetManagement.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        public UserService(ApplicationDbContext dbContext, UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task<User> GetUserLogin(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            return user;
        }

        public async Task<bool> Logout()
        {
            await _signInManager.SignOutAsync();
            return true;
        }

        public async Task<bool> ChangePasswordFirstTime(ChangePasswordVM vm)
        {
            var user = await _dbContext.Users.FindAsync(vm.userId);
            if (user != null && vm.passwordNew != "")
            {
                PasswordHasher<User> hash = new PasswordHasher<User>();
                var hashPassword = hash.HashPassword(user, vm.passwordNew);
                user.PasswordHash = hashPassword;
                user.Type = UserType.Staff;

                return await _dbContext.SaveChangesAsync() > 0;
            }
            else
            {
                return false;
            }
        }

        public async Task<int> ChangePassword(ChangePasswordVM vm)
        {
            var user = await _dbContext.Users.FindAsync(vm.userId);
            if (user != null && vm.passwordNew != "" && vm.passwordOld != "")
            {
                PasswordHasher<User> hash = new PasswordHasher<User>();
                var verifyPasswordResult = hash.VerifyHashedPassword(user, user.PasswordHash, vm.passwordOld);

                if (verifyPasswordResult.ToString() == "Success")
                {
                    var hashPassword = hash.HashPassword(user, vm.passwordNew);
                    user.PasswordHash = hashPassword;
                    _dbContext.SaveChanges();

                    return 1;
                }
                else
                {
                    return 2;
                }
            }
            else
            {
                return 0;
            }
        }
    }
}
