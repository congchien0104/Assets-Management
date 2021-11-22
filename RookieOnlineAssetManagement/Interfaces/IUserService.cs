using RookieOnlineAssetManagement.Data.Entities;
using RookieOnlineAssetManagement.Data.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Interfaces
{
    public interface IUserService
    {
        Task<User> GetUserLogin(string email);
        Task<int> ChangePassword(ChangePasswordVM vm);
        Task<bool> ChangePasswordFirstTime(ChangePasswordVM vm);
        Task<bool> Logout();
    }
}
